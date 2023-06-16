import { IsNumber, IsString } from 'class-validator';
import { Customer } from '../customer.model';
import { InvoiceData } from '../invoice.model';
import { TrackingDataRequest } from '../tracking.user.model';
import { ChargeBankRequest } from './bank.request';

export class ChargeTransactionRequest {
  @IsString()
  payment_type: string;

  bank_transfer: ChargeBankRequest;
  InvoiceData: InvoiceData;
  CustomerData: Customer;
  TrackDataRequest: TrackingDataRequest;

  // Include other properties as per your requirements
}