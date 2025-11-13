import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { DrizzleService } from 'src/database/drizzle.service';
import { employees } from 'src/database/schema';

@Injectable()
export class EmployeesService {
  constructor(private drizzleService: DrizzleService) { }

  async create(createEmployeeDto: CreateEmployeeDto) {
    const created_data = await this.drizzleService.db.insert(employees).values(createEmployeeDto)
    
    return {
      message: `Employee created`,
      status: HttpStatus.CREATED,
      data: {
        ...created_data
      }
    }
  }

  async findAll() {
    const data_employee = await this.drizzleService.db.select({
      id: employees.id,
      employee_code: employees.employee_code,
      employee_name: employees.employee_name
    }).from(employees)

    return {
      message: `Data loaded`,
      status: HttpStatus.OK,
      data: data_employee
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} employee`;
  }

  update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    return `This action updates a #${id} employee`;
  }

  remove(id: number) {
    return `This action removes a #${id} employee`;
  }
}
