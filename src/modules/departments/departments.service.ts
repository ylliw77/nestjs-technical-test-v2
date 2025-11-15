import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { departments } from 'src/database/schema';
import { DrizzleService } from 'src/database/drizzle.service';
import { FindDepartmentDto } from './dto/find-department.dto';
import { eq, ilike, or, and, sql } from 'drizzle-orm';
import { paginationGenerator } from 'src/helper/get-meta';

@Injectable()
export class DepartmentsService {
  constructor(private drizzleService: DrizzleService) { }

  async create(createDepartmentDto: CreateDepartmentDto) {
    try {
      const [newDepartment] = await this.drizzleService.db
        .insert(departments)
        .values(createDepartmentDto)
        .returning();

      return {
        message: 'Department created successfully',
        status: HttpStatus.CREATED,
        data: newDepartment
      };
    } catch (error) {
      throw error;
    }
  }

  async findAll(params: FindDepartmentDto) {
    try {
      const conditions = [];

      if (params.inc_dept_id) {
        conditions.push(eq(departments.id, params.inc_dept_id))
      }

      if (params.company_id) {
        conditions.push(eq(departments.company_id, params.company_id));
      }

      if (params.search) {
        conditions.push(
          or(
            ilike(departments.department_name, `%${params.search}%`),
            ilike(departments.department_code, `%${params.search}%`)
          )
        );
      }


      const offset = ((params.page || 1) - 1) * (params.pageSize || 10);

      const data_department = await this.drizzleService.db.query.departments.findMany({
        with: {
          company: true
        },
        limit: params.pageSize || 10,
        offset: offset,
        where: conditions.length > 0 ? and(...conditions) : undefined,
        orderBy: (departments, { asc, desc }) => params.order_by === 'asc' ? [asc(departments.created_at)] : [desc(departments.created_at)]
      });

      const [{ count }] = await this.drizzleService.db
        .select({ count: sql<number>`count(*)` })
        .from(departments)
        .where(conditions.length > 0 ? and(...conditions) : undefined);

      const meta = paginationGenerator({ page: params.page, pageSize: params.pageSize, count: +count })

      return {
        message: 'Data loaded',
        status: HttpStatus.OK,
        data: data_department,
        meta
      };
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      const department = await this.drizzleService.db.query.departments.findFirst({
        where: (departments, { eq }) => eq(departments.id, id),
        with: {
          company: true
        }
      });

      if (!department) {
        return {
          message: 'Department not found',
          status: HttpStatus.NOT_FOUND,
          data: null
        };
      }

      return {
        message: 'Department found',
        status: HttpStatus.OK,
        data: department
      };
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, updateDepartmentDto: UpdateDepartmentDto) {
    try {
      const [updatedDepartment] = await this.drizzleService.db
        .update(departments)
        .set(updateDepartmentDto)
        .where(eq(departments.id, id))
        .returning();

      if (!updatedDepartment) {
        return {
          message: 'Department not found',
          status: HttpStatus.NOT_FOUND,
          data: null
        };
      }

      return {
        message: 'Department updated successfully',
        status: HttpStatus.OK,
        data: updatedDepartment
      };
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    try {
      const [deletedDepartment] = await this.drizzleService.db
        .update(departments)
        .set({ is_deleted: 1 })
        .where(eq(departments.id, id))
        .returning();

      if (!deletedDepartment) {
        return {
          message: 'Department not found',
          status: HttpStatus.NOT_FOUND,
          data: null
        };
      }

      return {
        message: 'Department deleted successfully',
        status: HttpStatus.OK,
        data: deletedDepartment
      };
    } catch (error) {
      throw error;
    }
  }
}