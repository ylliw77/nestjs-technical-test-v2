import { ApiPropertyOptional, PartialType } from "@nestjs/swagger";
import { DefaultParamsDto } from "src/common/params/default-params.dto";

export class FindCountryDto extends PartialType(DefaultParamsDto) {
    @ApiPropertyOptional()
    country_id: string;

    @ApiPropertyOptional()
    inc_country_id: string;

    @ApiPropertyOptional()
    selected_country_id: string;
}
