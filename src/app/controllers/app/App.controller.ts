import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from 'src/app/services/app/App.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post("testing")
  async Testing(@Body() data){
    console.log("testing",data)
  }
}
