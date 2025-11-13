import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DrizzleModule } from './database/drizzle.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import databaseConfig from './config/database.config';
import { validate } from './config/env.validation';
import { CompaniesModule } from './modules/companies/companies.module';
import { EmployeesModule } from './modules/employees/employees.module';
import { ProvinceModule } from './modules/province/province.module';
import { CitiesModule } from './modules/cities/cities.module';
import { CountriesModule } from './modules/countries/countries.module';
import { DepartmentsModule } from './modules/departments/departments.module';
import { RolesModule } from './modules/roles/roles.module';
import { PositionsModule } from './modules/positions/positions.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
      validate,
    }),
    DrizzleModule,
    AuthModule,
    UsersModule,
    CompaniesModule,
    EmployeesModule,
    ProvinceModule,
    CitiesModule,
    CountriesModule,
    DepartmentsModule,
    RolesModule,
    PositionsModule
  ],
})
export class AppModule { }