import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { DisbursementRequestDto } from 'src/models/dto/disburse.mt.request';
import { AppService } from '../services/app.service';

@Controller("/api/v1/")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post("/disburse")
  @HttpCode(200)
  createDisbursement(@Body() disbursementRequest: DisbursementRequestDto): any {
    // Implement your microservice logic here
    return this.appService.createDisbursement(disbursementRequest);
  }

  @MessagePattern({ cmd: 'disbursement_mt' })
  disburseMidTrans(@Body() disbursementRequest: DisbursementRequestDto): any {
    // Implement your microservice logic here
    return this.appService.disbursementMoney(disbursementRequest);
  }
}
