import { ApiProperty } from "@nestjs/swagger"
import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min} from "class-validator"


export class PaginationDto {

    @ApiProperty({
        description: 'records per page',
        example: 4,
        required: false
    })
    @IsOptional()
    limit: number

    @ApiProperty({
        description: 'page Number',
        example: 1,
        required: false
    })
    @IsOptional()
    page: number

}
