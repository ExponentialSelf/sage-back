import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}   // cab be deleted local host 3000 default 

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
