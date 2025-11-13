import { Injectable } from '@nestjs/common';
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
    return this.drizzleService.db.select({
      id: users.id,
      username: users.username,
      created_at: users.createdAt,
    }).from(users).leftJoin(employees, eq(users.id, employees.id))
  }
}