import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { companies } from 'src/database/schema';
import { DrizzleService } from 'src/database/drizzle.service';
import { and, eq, ilike, or, sql } from 'drizzle-orm';
import { FindCompanyDto } from './dto/find-company-dto';

@Injectable()
export class CompaniesService {
  constructor(private drizzleService: DrizzleService) { }

  async create(createCompanyDto: CreateCompanyDto) {
    try {
      const [newCompany] = await this.drizzleService.db
        .insert(companies)
        .values(createCompanyDto)
        .returning();

      return {
        message: 'Company created successfully',
        status: HttpStatus.CREATED,
        data: newCompany
      };
    } catch (error) {
      throw error;
    }
  }

  async findAll(params: FindCompanyDto) {
    try {
      // Build where conditions
      const whereConditions = this.buildWhereConditions(params);
      
      // Calculate pagination
      const page = params.page || 1;
      const pageSize = params.pageSize || 10;
      const offset = (page - 1) * pageSize;

      // Fetch companies
      const data_company = await this.drizzleService.db.query.companies.findMany({
        limit: pageSize,
        offset: offset,
        where: whereConditions,
        orderBy: this.getSortOrder(params)
      });

      // Get total count for pagination
      const totalCount = await this.getTotalCount(whereConditions);

      return {
        message: 'Data loaded successfully',
        status: HttpStatus.OK,
        data: data_company,
        pagination: {
          page: page,
          pageSize: pageSize,
          total: totalCount,
          totalPages: Math.ceil(totalCount / pageSize)
        }
      };
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      const company = await this.drizzleService.db.query.companies.findFirst({
        where: (companies, { eq }) => eq(companies.id, id)
      });

      if (!company) {
        return {
          message: 'Company not found',
          status: HttpStatus.NOT_FOUND,
          data: null
        };
      }

      return {
        message: 'Company found',
        status: HttpStatus.OK,
        data: company
      };
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, updateCompanyDto: UpdateCompanyDto) {
    try {
      const [updatedCompany] = await this.drizzleService.db
        .update(companies)
        .set(updateCompanyDto)
        .where(eq(companies.id, id))
        .returning();

      if (!updatedCompany) {
        return {
          message: 'Company not found',
          status: HttpStatus.NOT_FOUND,
          data: null
        };
      }

      return {
        message: 'Company updated successfully',
        status: HttpStatus.OK,
        data: updatedCompany
      };
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    try {
      const [deletedCompany] = await this.drizzleService.db
        .update(companies)
        .set({is_deleted : 1})
        .where(eq(companies.id, id))
        .returning();

      if (!deletedCompany) {
        return {
          message: 'Company not found',
          status: HttpStatus.NOT_FOUND,
          data: null
        };
      }

      return {
        message: 'Company deleted successfully',
        status: HttpStatus.OK,
        data: deletedCompany
      };
    } catch (error) {
      throw error;
    }
  }

  private buildWhereConditions(params: FindCompanyDto) {
    const conditions = [];

    if (params.inc_company_id) {
      conditions.push(eq(companies.id, params.inc_company_id));
    }

    if (params.company_id) {
      conditions.push(eq(companies.id, params.company_id));
    }

    if (params.search) {
      conditions.push(
        or(
          ilike(companies.company_code, `%${params.search}%`),
          ilike(companies.company_name, `%${params.search}%`)
        )
      );
    }

    return conditions.length > 0 ? and(...conditions) : undefined;
  }

  private getSortOrder(params: FindCompanyDto) {
    return (companies, { asc, desc }) => 
      params.order_by === 'desc' 
        ? [desc(companies.created_at)] 
        : [asc(companies.created_at)];
  }

  private async getTotalCount(whereConditions: any): Promise<number> {
    const result = await this.drizzleService.db
      .select({ count: sql<number>`count(*)` })
      .from(companies)
      .where(whereConditions);

    return result[0]?.count || 0;
  }
}