import { HttpStatus, Injectable } from '@nestjs/common';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
import { DrizzleService } from 'src/database/drizzle.service';
import { companies, departments, positions } from 'src/database/schema';

@Injectable()
export class PositionsService {
  constructor(private drizzleService: DrizzleService) { }

  create(createPositionDto: CreatePositionDto) {
    return 'This action adds a new position';
  }

  async findAll() {
    const data_position = await this.drizzleService.db.query.positions.findMany({
      with: {
        role: true
      }
    })

    return {
      message: `Data loaded`,
      status: HttpStatus.OK,
      data: data_position
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} position`;
  }

  update(id: number, updatePositionDto: UpdatePositionDto) {
    return `This action updates a #${id} position`;
  }

  remove(id: number) {
    return `This action removes a #${id} position`;
  }
}
