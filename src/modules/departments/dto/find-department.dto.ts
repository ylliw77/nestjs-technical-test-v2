import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateDepartmentDto } from './create-department.dto';
import { DefaultParamsDto } from 'src/common/params/default-params.dto';
import { IsOptional, IsUUID } from 'class-validator';

export class FindDepartmentDto extends PartialType(DefaultParamsDto) {
    @ApiPropertyOptional()
    @IsOptional()
    company_id: string;

    @ApiPropertyOptional()
    @IsOptional()
    unique_id_selected: string;

    @ApiPropertyOptional()
    @IsOptional()
    inc_dept_id: string;
}
