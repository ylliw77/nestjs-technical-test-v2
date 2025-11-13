import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { companies } from 'src/database/schema';
import { DrizzleService } from 'src/database/drizzle.service';
import { eq } from 'drizzle-orm';

@Injectable()
export class CompaniesService {
  constructor(private drizzleService: DrizzleService) { }

  async create(createCompanyDto: CreateCompanyDto) {
    const created_data = await this.drizzleService.db.insert(companies).values(createCompanyDto)

    return {
      message: `Company created`,
      status: HttpStatus.CREATED,
      data: {
        ...created_data
      }
    }
  }

  async findAll() {
    const data_company = await this.drizzleService.db.select({
      id: companies.id,
      company_code: companies.company_code,
      company_name: companies.company_name
    }).from(companies)

    return {
      message: `Data loaded`,
      status: HttpStatus.OK,
      data: data_company
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} company`;
  }

  async update(id: string, updateCompanyDto: UpdateCompanyDto) {
    const updated_data = await this.drizzleService.db.update(companies).set(updateCompanyDto).where(eq(companies.id, id)).returning()

    return {
      message: `Company updated`,
      status: HttpStatus.OK,
      data: {
        ...updated_data
      }
    }
  }

  remove(id: number) {
    return `This action removes a #${id} company`;
  }
}
