import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { DefaultParamsDto } from 'src/common/params/default-params.dto';
import { IsOptional } from 'class-validator';

export class FindCompanyDto extends PartialType(DefaultParamsDto) {
    @ApiPropertyOptional()
    @IsOptional()
    company_id: string;

    @ApiPropertyOptional()
    @IsOptional()
    unique_id_selected: string;

    @ApiPropertyOptional()
    @IsOptional()
    inc_company_id: string;
}
