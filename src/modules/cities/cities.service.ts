import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { DrizzleService } from 'src/database/drizzle.service';

@Injectable()
export class CitiesService {
  constructor(private drizzleService: DrizzleService) { }

  create(createCityDto: CreateCityDto) {
    return 'This action adds a new city';
  }

  async findAll() {
    const data_city = await this.drizzleService.db.query.cities.findMany({
      with: {
        province: true
      }
    })

    return {
      message: `Data loaded`,
      status: HttpStatus.OK,
      data: data_city
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} city`;
  }

  update(id: number, updateCityDto: UpdateCityDto) {
    return `This action updates a #${id} city`;
  }

  remove(id: number) {
    return `This action removes a #${id} city`;
  }
}
