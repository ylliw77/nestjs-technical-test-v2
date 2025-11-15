import { HttpStatus, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DrizzleService } from '../../database/drizzle.service';
import { employees, users } from '../../database/schema';

@Injectable()
export class UsersService {
  constructor(private drizzleService: DrizzleService) { }

  async findById(id: string) {
    return this.drizzleService.db.query.users.findFirst({
      where: eq(users.id, id),
    });
  }

  async findAll() {
    const data_user = await this.drizzleService.db.select().from(users).leftJoin(employees, eq(users.id, employees.user_id))

    return {
      status: HttpStatus.OK,
      message: 'Data user loaded',
      data: data_user
    }
  }
}