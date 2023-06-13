import { Controller, Get } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller("/api/v1/")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/disburse")
  createDisbursement(data: any): any {
    // Implement your microservice logic here
    return this.appService.createDisbursement();
  }

  @Get("/disburse")
  @MessagePattern({ cmd: 'disbursement_mt' })
  disburseMidTrans(data: any): any {
    // Implement your microservice logic here
    return this.appService.disbursementMoney();
  }
}
