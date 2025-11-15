import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import { DrizzleService } from 'src/database/drizzle.service';
import { countries } from 'src/database/schema';
import { BaseService } from 'src/common/base.service';
import { FindCountryDto } from './dto/find-country.dto';

@Injectable()
export class CountriesService extends BaseService {
  constructor(drizzleService: DrizzleService) {
    super(drizzleService)
  }

  async create(createCountry: CreateCountryDto) {
    try {
      const [newCountry] = await this.drizzleService.db
        .insert(countries)
        .values(createCountry)
        .returning();

      return {
        message: 'Country created successfully',
        status: HttpStatus.CREATED,
        data: newCountry
      };
    } catch (error) {
      throw error;
    }
  }

  async findAll(params: FindCountryDto) {
    try {
      const whereConditions = this.buildWhereCondition(countries, {
        ...params,
        id: params.country_id || params.inc_country_id,
        searchFields: ['country_code', 'country_name']
      });

      const page = params.page || 1;
      const pageSize = params.pageSize || 10;
      const offset = this.calculateOffset(page, pageSize);

      const data_country = await this.drizzleService.db.query.countries.findMany({
        limit: pageSize,
        offset: offset,
        where: whereConditions,
        orderBy: this.getSortOrder(countries, 'created_at', params.order_by)
      });
      const totalCount = await this.getCountData(countries, whereConditions);

      return {
        message: 'Data loaded successfully',
        status: HttpStatus.OK,
        data: data_country,
        pagination: this.buildPagination(page, pageSize, totalCount)
      };
    } catch (error) {
      throw error;
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} country`;
  }

  update(id: number, updateCountryDto: UpdateCountryDto) {
    return `This action updates a #${id} country`;
  }

  remove(id: number) {
    return `This action removes a #${id} country`;
  }
}
