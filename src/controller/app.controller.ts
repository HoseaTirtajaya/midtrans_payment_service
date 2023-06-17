import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { DisbursementRequestDto } from 'src/models/dto/disburse.mt.request';
import { AppService } from '../services/app.service';
import { ChargeTransactionRequest } from 'src/models/dto/charge.transaction.mt.request';

@Controller("/api/v1/")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post("/disburse")
  @HttpCode(200)
  createDisbursement(@Body() disbursementRequest: DisbursementRequestDto): any {
    // Implement your microservice logic here
    return this.appService.createDisbursement(disbursementRequest);
  }

  @Post("/charge/transaction")
  @HttpCode(200)
  chargeTransaction(@Body() chargeReq: ChargeTransactionRequest): any {
    // Implement your microservice logic here
    return this.appService.chargeTransaction(chargeReq);
  }

  @MessagePattern({ cmd: 'disbursement_mt' })
  disburseMidTrans(@Body() disbursementRequest: DisbursementRequestDto): any {
    // Implement your microservice logic here
    return this.appService.disbursementMoney(disbursementRequest);
  }

  @MessagePattern({ cmd: 'charge_tx_mt' })
  chargeTransactionMidtrans(@Body() disbursementRequest: ChargeTransactionRequest): any {
    // Implement your microservice logic here
    return this.appService.chargeTransactionRequest(disbursementRequest);
  }
}
