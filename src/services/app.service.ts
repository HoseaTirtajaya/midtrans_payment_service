import { DisbursementRequestDto } from './../models/dto/disburse.mt.request';
import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { BaseApiResponse } from 'src/models/dto/base.api.response';


@Injectable()
export class AppService {
  constructor(@Inject('CLIENT_PROXY') private readonly clientProxy: ClientProxy) {}

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
}
