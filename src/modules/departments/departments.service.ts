import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { departments } from 'src/database/schema';
import { DrizzleService } from 'src/database/drizzle.service';

@Injectable()
export class DepartmentsService {
  constructor(private drizzleService: DrizzleService) { }

  create(createDepartmentDto: CreateDepartmentDto) {
    return 'This action adds a new department';
  }

  async findAll() {
    const data_department = await this.drizzleService.db.query.departments.findMany({
      with: {
        company: true
      }
    })

    return {
      message: `Data loaded`,
      status: HttpStatus.OK,
      data: data_department
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} department`;
  }

  update(id: number, updateDepartmentDto: UpdateDepartmentDto) {
    return `This action updates a #${id} department`;
  }

  remove(id: number) {
    return `This action removes a #${id} department`;
  }
}
