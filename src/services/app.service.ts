import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { BaseApiResponse } from 'src/models/dto/base.api.response';
import { ChargeTransactionRequest } from 'src/models/dto/charge.transaction.mt.request';
import { InvoiceData } from 'src/models/invoice.model';
import { Base64Converter } from 'src/shared/base64.converter';
import { DisbursementRequestDto } from './../models/dto/disburse.mt.request';
import axios from 'axios';
import midtransAxiosInstance from 'src/config/axios.config';


@Injectable()
export class AppService {
  constructor(@Inject('CLIENT_PROXY') private readonly clientProxy: ClientProxy, 
                private readonly configService: ConfigService,
                private readonly base64Converter: Base64Converter
              ) {}

  async createDisbursement(req: DisbursementRequestDto){
    const pattern = { cmd: 'disbursement_mt' };
    const payload = req; // Additional payload data, if needed

    const result = this.clientProxy.send<any>(pattern, payload);
    const response = await lastValueFrom(result);
    return response;
  }

  disbursementMoney(request: DisbursementRequestDto): any{
    // Perform operations to retrieve data
    const response: BaseApiResponse<DisbursementRequestDto> = {
      code: "200",
      message: "Success",
      data: request
    }

    return response;
  }

  async chargeTransactionRequest(request: ChargeTransactionRequest): Promise<any>{
    const responseMt = await midtransAxiosInstance.post("/v2/charge", request);

    // Perform operations to retrieve data  
    const response: BaseApiResponse<InvoiceData> = {
      code: "200",
      message: "Success",
      data: responseMt.data
    }

    return response;
  }
}
