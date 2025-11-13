import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { DrizzleService } from 'src/database/drizzle.service';

@Injectable()
export class RolesService {
    constructor(private drizzleService: DrizzleService) { }
  
  create(createRoleDto: CreateRoleDto) {
    return 'This action adds a new role';
  }

  async findAll() {
      const data_role = await this.drizzleService.db.query.roles.findMany({
      })
  
      return {
        message: `Data loaded`,
        status: HttpStatus.OK,
        data: data_role
      }
    }

  findOne(id: number) {
    return `This action returns a #${id} role`;
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
