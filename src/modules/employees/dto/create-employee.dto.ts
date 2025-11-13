import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsEmail, IsString, IsUUID } from "class-validator"

export class CreateEmployeeDto {

    @ApiProperty()
    @IsString()
    employee_code: string;

    @ApiProperty()
    @IsString()
    employee_name: string;

    @ApiProperty()
    @IsUUID()
    user_id: string;

    @ApiProperty()
    @IsUUID()
    role_id: string;

    @ApiProperty()
    @IsUUID()
    company_id: string;

    @ApiPropertyOptional()
    @IsUUID()
    department_id: string;

    @ApiPropertyOptional()
    @IsUUID()
    position_id: string;

    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiPropertyOptional()
    @IsUUID()
    country_id: string;

    @ApiPropertyOptional()
    @IsUUID()
    province_id: string;

    @ApiPropertyOptional()
    @IsUUID()
    city_id: string;
}
