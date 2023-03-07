
import { Controller, Post,Body, Put, Query, Get, } from "@nestjs/common";
import {  ApiBadRequestResponse, ApiBearerAuth, ApiOperation, ApiResponse, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { ForgetPasswordService } from "src/app/services/auth/ForgetPassword.service"
import { hashPassword } from "src/app/utils/auth/bcrypt";



@ApiTags('Forget Password')
@ApiBadRequestResponse({ description: 'Bad Request' })
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
@ApiResponse({ status: 200, description: 'success' })
@Controller()

export class ForgetPasswordController {
    constructor( private readonly forgetPasswordService:ForgetPasswordService) { }

    @Post('forgetpassword')
    @ApiOperation({ summary: 'forget password api' })
    async forgetpassword(
      @Body('platform_id') platform_id: number,
      @Body('email') email: string,
    ) {
      const a = await this.forgetPasswordService.forgetpassword(email, platform_id)
      if (a) {
        return ({
          status: 'true',
          mail: 'sent',
          message: 'success'
        })
      }
      else {
        return ({
          status: 'false',
          mail: 'not send',
          message: 'failed'
        })
      }
    }

    
    @Post('passowrd_changed')
    @ApiOperation({ summary: 'change passord api' })
    async changePassword(
      @Query('password') password: string,
      @Query('email') email: string,
      @Query('platform_id') platform_id: number
    ) {
      const hash = await hashPassword(password)
      const res = await this.forgetPasswordService.changePassword(hash, email, platform_id)
      if (res.length > 0) {
        return ({
          status: 'true',
          messge: 'User password changed successfully!',
        })
      }
      else {
        return ({
          status: 'false',
          messge: 'Something went wrong',
        })
      }
    }


    @ApiBearerAuth()
    @Post('code_verified')
    @ApiOperation({ summary: 'verifying code api' })
    async codeVerified(
      @Query('code') code: number,
      @Query('email') email: string,
      @Query('platform_id') platform_id: number
  
    ) {
      const res = await this.forgetPasswordService.codeVerified(email, platform_id)
      if (res.f_code == code) {
        return ({
          status: 'true',
          message: 'Code match successfully'
        })
      }
      else {
        return ({
          status: 'false',
          message: 'The code you entered is incorrect please try again'
        })
      }
    }
}