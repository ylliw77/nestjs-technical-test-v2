import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsString, IsUUID } from "class-validator";

export class CreateDepartmentDto {
    @ApiProperty()
    @IsString()
    department_code: string

    @ApiProperty()
    @IsString()
    department_name: string

    @ApiPropertyOptional()
    @IsUUID()
    company_id: string
}
