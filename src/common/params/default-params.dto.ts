import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsNumber, IsString, MaxLength } from "class-validator";
import { OrderByEnum } from "../enums/param.enum";

export class DefaultParamsDto {
    @ApiPropertyOptional()
    @IsString()
    search: string;

    @ApiPropertyOptional()
    @IsNumber()
    page: number = 1;

    @ApiPropertyOptional()
    @IsNumber()
    pageSize: number = 10;

    @ApiPropertyOptional({
        enum: OrderByEnum
    })
    @IsEnum(OrderByEnum)
    order_by: OrderByEnum
}
