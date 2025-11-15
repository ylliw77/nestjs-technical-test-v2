import { ApiProperty } from "@nestjs/swagger";

export class CreateCountryDto {
    @ApiProperty()
    country_code: string;

    @ApiProperty()
    country_name: string;
}
