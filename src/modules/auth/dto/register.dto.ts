import { IsEmail, IsString, MinLength, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty()
  @IsString()
  @MinLength(2)
  employee_name: string;

  @ApiProperty()
  @IsString()
  @MinLength(2)
  employee_code: string;

  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsString()
  address: string;
  
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsUUID()
  company_id: string;

  @ApiProperty()
  @IsUUID()
  role_id: string;

  @ApiProperty()
  @IsUUID()
  position_id: string;

  @ApiProperty()
  @IsUUID()
  country_id: string;

  @ApiProperty()
  @IsUUID()
  province_id: string;

  @ApiProperty()
  @IsUUID()
  city_id: string;

  @ApiProperty()
  @IsUUID()
  department_id: string;
}