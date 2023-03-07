import { ApiProperty } from "@nestjs/swagger"
import { IsDate, IsNotEmpty} from "class-validator"


export class GetLoginDto {

    @ApiProperty({
        description: 'Your Email',
        example: 'naeem@shahzad.com',
        required: true
    })
    @IsNotEmpty()
    email: string

    @ApiProperty({
        description: 'Platform Id',
        example: '18',
        required: true
    })
    @IsNotEmpty()
    platform_id: number

    @ApiProperty({
        description: 'Password',
        example: 'some password',
        required: true
    })
    @IsNotEmpty()
    password: string

    @ApiProperty({
        description: 'Fcm Token',
        example: 'dasddsadsadsadadaasda',
    })
    token: string

    @ApiProperty({
        description: 'Timezone Offset',
        example: '-300',
        required: true
    })
    @IsNotEmpty()
    timezone: Date
}
