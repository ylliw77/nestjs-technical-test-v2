import { ApiProperty } from "@nestjs/swagger";
import { IsString, MaxLength } from "class-validator";

export class CreateCompanyDto {
    @ApiProperty()
    @IsString()
    @MaxLength(30)
    company_code: string;

    @ApiProperty()
    @IsString()
    @MaxLength(30)
    company_name: string;
}
