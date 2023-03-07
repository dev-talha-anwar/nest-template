
import { MailerService } from "@nestjs-modules/mailer";
import { Controller, Get, Query, Post, Body  } from "@nestjs/common";
import {  ApiBadRequestResponse, ApiOperation, ApiResponse, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";

import { GetLoginDto } from "src/app/dtos/GetLogin.dto";
import { LoginService } from "src/app/services/auth/Login.service";


@ApiTags('Login')
@ApiBadRequestResponse({ description: 'Bad Request' })
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
@ApiResponse({ status: 200, description: 'success' })
@Controller()

export class LoginController {
    constructor(private readonly loginService:LoginService) { }


    @Post('getlogin')
    async user(
      @Body() getLogin: GetLoginDto
    ) {
      console.log(getLogin)
      const res = await this.loginService.login(getLogin)
      if (res) {
        return res
      }
    }
}