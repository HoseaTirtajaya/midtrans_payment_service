import { ConfigService } from '@nestjs/config';
import { DisbursementRequestDto } from './../models/dto/disburse.mt.request';
import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { BaseApiResponse } from 'src/models/dto/base.api.response';
import { Base64Converter } from 'src/shared/base64.converter';


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
    const apiKey= this.encryptSecretMTtoBase64();
    // Perform operations to retrieve data
    const response: BaseApiResponse<DisbursementRequestDto> = {
      code: "200",
      message: "Success",
      data: request
    }

    return response;
  }

  chargeTransactionRequest(request: DisbursementRequestDto): any{
    const apiKey= this.encryptSecretMTtoBase64();
    // Perform operations to retrieve data
    const response: BaseApiResponse<DisbursementRequestDto> = {
      code: "200",
      message: "Success",
      data: request
    }

    return response;
  }

  encryptSecretMTtoBase64() : string{
    const API_KEY: string = this.configService.get<string>('MIDTRANS_SERVER_KEY') + ":";
    console.log(API_KEY);
    console.log(this.base64Converter.decodeBase64("U0ItTWlkLXNlcnZlci1qb2Q2U3d1cW1jT0ZpTEd0MGdUT0djZ3k6"));
    const base64ApiKey: string = this.base64Converter.encodeBase64(API_KEY);
    return base64ApiKey;
  }
}
