import { ApiProperty } from "@nestjs/swagger"

export class InspireSignupDto {

    @ApiProperty({
        description: 'First name of user',
        example: 'Naeem',
        required: true
    })
    first_name: string

    @ApiProperty({
        description: 'Last name of user',
        example: 'Shahzad',
        required: true
    })
    last_name: string

    @ApiProperty({
        description: 'email of user',
        example: 'naeemshahzad9595@gmail.com',
        required: true
    })
    email: string

    @ApiProperty({
        description: 'Choose your country',
        example: 'Pakistan',
        required: true
    })
    country: string

    @ApiProperty({
        
    })
    speciality: string

    @ApiProperty({
    
    })
    workplace_type: string

    @ApiProperty({
      
    })
    workplace_sector: string

    @ApiProperty({
        description: 'choose your country code',
        example: '+92',
        required: true
    })
    country_code: number

    @ApiProperty({
        description: 'choose your city',
        example: 'Lahore',
    })
    city: string

    @ApiProperty({

    })
    salutation: string

    @ApiProperty({
        description: 'Enter platform_id where you wana signup',
        example: '18',
        required: true
    })
    platform_id: number

    @ApiProperty({
        description: 'Insert you phone number',
        example: '+923011234567',
    })
    phone_number: string

    @ApiProperty({

    })
    workplace_name: string

    @ApiProperty({
        description: 'Enter a strong password',
        example: '%*&^$%@#%#$',
        required: true
    })
    password: string

    @ApiProperty({
        description:'Put signup token here',
        example: 'adfoeir-q8349t6u90rfiobio',
        required: true
    })
    signup_verification_token:string
}

