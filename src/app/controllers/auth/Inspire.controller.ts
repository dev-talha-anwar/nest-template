import { MailerService } from "@nestjs-modules/mailer";
import { Controller, Get, Body,Post, Query } from "@nestjs/common";
import { ApiBadRequestResponse, ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { InspireSignupDto } from "src/app/dtos/InspireSignup.dto";
import { InspireService } from "src/app/services/auth/Inspire.service";



@ApiTags('inspire')
@ApiBadRequestResponse({ description: 'Bad Request' })
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
@ApiResponse({ status: 200, description: 'success' })
@Controller()

export class InspireController {
    constructor( private readonly inspireService:InspireService) { }

    @Get('inspire_signup_get')
    async getDetail() {
        const res = await this.inspireService.signupget()
        return res
    }
  



    @Post('inspire_signup_post')
    @ApiOperation({ summary: 'Signup for inspire' })
    async postUser(
        @Body() userSignup: InspireSignupDto
    ) 
    {
        console.log(userSignup)
    const res = await this.inspireService.signupPost(userSignup)
    return res
    }

    @Post('inspire_signup_post_resend_verify')
    @ApiOperation({ summary: 'Verify account again' })
    async verifyAgain(
        @Query('email') email: string,
        @Query('platform_id') platform_id: number
    ) {
      const res = await this.inspireService.reverify(email,platform_id)
      return res
    }

    @Post('inspire_signup_post_verify')
    @ApiQuery({
        name: 'email',
        required: true,
        description: 'Enter your email',
    })
    @ApiQuery({
        name: 'platform_id',
        required: true,
        description: 'Enter platform_id',
    })
    @ApiQuery({
        name: 'signup_verification_token',
        required: true,
        description: 'Enter that token which you received by email',
    })
    @ApiOperation({ summary: 'Verify your account' })
    async verifyUser(
        @Query('email') email: string,
        @Query('platform_id') platform_id: number,
        @Query('signup_verification_token') signup_verification_token: string
    ) {
      const res = await this.inspireService.inspireVerify(email,platform_id,signup_verification_token)
      return res
    }


  
}