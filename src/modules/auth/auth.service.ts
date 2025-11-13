import { Injectable, UnauthorizedException, ConflictException, HttpStatus, ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { and, eq } from 'drizzle-orm';
import * as bcrypt from 'bcrypt';
import { DrizzleService } from '../../database/drizzle.service';
import { companies, employees, roles, users } from '../../database/schema';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtPayload } from '../../common/interfaces/jwt-payload.interface';
import { Role } from '../../common/enums/role.enum';

@Injectable()
export class AuthService {
  constructor(
    private drizzleService: DrizzleService,
    private jwtService: JwtService,
  ) { }

  async register(registerDto: RegisterDto) {
    const existingUser = await this.drizzleService.db.query.users.findFirst({
      where: and(eq(users.username, registerDto.username)),
    });

    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(process.env.PASSWORD_DEFAULT, 10);

    const [newUser] = await this.drizzleService.db
      .insert(users)
      .values({
        username: registerDto.username,
        password: hashedPassword,
        is_deleted: 0
      })
      .returning();

    const [newEmployee] = await this.drizzleService.db
      .insert(employees)
      .values({
        employee_code: registerDto.employee_code,
        employee_name: registerDto.employee_name,
        company_id: registerDto.company_id,
        department_id: registerDto.department_id,
        position_id: registerDto.position_id,
        role_id: registerDto.role_id,
        user_id: newUser.id,
        is_deleted: 0,
        country_id: registerDto.country_id,
        province_id: registerDto.province_id,
        city_id: registerDto.city_id,
        address: registerDto.address
      }).returning()

    if (newEmployee) {
      return {
        status: HttpStatus.CREATED,
        message: 'New user created',
        data: {
          ...newEmployee,
        }
      }
    }

    return {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Internal Server Error',
    };
  }

  async login(loginDto: LoginDto) {
    const user = await this.drizzleService.db.query.users.findFirst({
      where: eq(users.username, loginDto.username),
    })

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const user_roles = await this.drizzleService.db
      .select()
      .from(employees)
      .leftJoin(users, eq(employees.user_id, user.id))
      .leftJoin(companies, eq(employees.company_id, companies.id))
      .leftJoin(roles, eq(employees.role_id, roles.id))
      .where(and(eq(employees.user_id, user.id), eq(employees.is_deleted, 0)))


    if (!user_roles) {
      throw new ForbiddenException('User doesnt have access');
    }

    const payload: JwtPayload = {
      id: user_roles[0].employees.user_id,
      username: loginDto.username,
      roles: user_roles.map(el => el.roles),
      companies: user_roles.map(el => el.companies)
    };


    return {
      status: HttpStatus.OK,
      data: {
        access_token: this.jwtService.sign(payload),
      }
    };
  }
}