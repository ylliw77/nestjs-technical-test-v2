import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import { DrizzleService } from 'src/database/drizzle.service';
import { countries } from 'src/database/schema';

@Injectable()
export class CountriesService {
  constructor(private drizzleService: DrizzleService) { }

  create(createCountryDto: CreateCountryDto) {
    return 'This action adds a new country';
  }

  async findAll() {
    const data_country = await this.drizzleService.db.select().from(countries)

    return {
      message: `Data loaded`,
      status: HttpStatus.OK,
      data: data_country
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
