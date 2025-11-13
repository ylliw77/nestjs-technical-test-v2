import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateProvinceDto } from './dto/create-province.dto';
import { UpdateProvinceDto } from './dto/update-province.dto';
import { DrizzleService } from 'src/database/drizzle.service';

@Injectable()
export class ProvinceService {
  constructor(private drizzleService: DrizzleService) { }

  create(createProvinceDto: CreateProvinceDto) {
    return 'This action adds a new province';
  }

  async findAll() {
    const data_country = await this.drizzleService.db.query.provinces.findMany({
      with: {
        country: true
      }
    })

    return {
      message: `Data loaded`,
      status: HttpStatus.OK,
      data: data_country
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} province`;
  }

  update(id: number, updateProvinceDto: UpdateProvinceDto) {
    return `This action updates a #${id} province`;
  }

  remove(id: number) {
    return `This action removes a #${id} province`;
  }
}
