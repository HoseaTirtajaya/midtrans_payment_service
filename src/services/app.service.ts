import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { BaseApiResponse } from 'src/models/dto/base.api.response';
import { ChargeTransactionRequest } from 'src/models/dto/charge.transaction.mt.request';
import { InvoiceData } from 'src/models/invoice.model';
import { DisbursementRequestDto } from './../models/dto/disburse.mt.request';
import midtransAxiosInstance from 'src/config/axios.config';
import { Customer } from 'src/models/customer.model';
import { TrackingDataRequest } from 'src/models/tracking.user.model';


@Injectable()
export class AppService {
  constructor(@Inject('CLIENT_PROXY') private readonly clientProxy: ClientProxy, 
                private readonly configService: ConfigService
              ) {}

  async createDisbursement(req: DisbursementRequestDto){
    const pattern = { cmd: 'disbursement_mt' };
    const payload = req; // Additional payload data, if needed

    const result = this.clientProxy.send<any>(pattern, payload);
    const response = await lastValueFrom(result);
    return response;
  }

  async chargeTransaction(req: ChargeTransactionRequest){
    const pattern = { cmd: 'charge_tx_mt' };
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
    //Create Invoice Data
    let transactionDetails: InvoiceData = new InvoiceData();

    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 5; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }

    const orderIdStr : string = "track_id-" + result + "-" + Date.now();
    // Make sure transactionDetails is not null or undefined before setting its properties
    if (transactionDetails) {
      transactionDetails.order_id = orderIdStr;
    } else {
      // Handle the case when transactionDetails is null or undefined
      console.error("transactionDetails is null or undefined.");
    }

    //Create Customer Data
    let userData: Customer = {
      email: "hoseatirtajaya@gmail.com",
      first_name: "Hosea",
      last_name: "Tirtajaya",
      phone_number: "089623187104"
    }

    //Array Product Data
    let requestTrackArray: TrackingDataRequest[] = [];

    //Create Product Data
    let requestTrackData: TrackingDataRequest = {
      id: 1,
      name: "Pencarian atas nama John Doe",
      quantity: 1,
      price: 150000,
    };

    requestTrackArray.push(requestTrackData);

    //For Looping the gross amount
    let sumGrossAmt: number = 0;
    for(let j = 0; j < requestTrackArray.length; j++){
      sumGrossAmt += (requestTrackArray[j].price * requestTrackArray[j].quantity)
    }

    transactionDetails.gross_amount = sumGrossAmt != null ? sumGrossAmt : 0;
    
    //Assign to request param above
    request.transaction_details = transactionDetails;
    request.customer_details = userData;
    request.item_details = requestTrackArray;

    const responseMt = await midtransAxiosInstance.post("/v2/charge", request);

    // Perform operations to retrieve data  
    const response: BaseApiResponse<any> = {
      code: "200",
      message: "Success",
      data: responseMt.data
    }

    return response;
  }
}
