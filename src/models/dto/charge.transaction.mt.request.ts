import { IsNumber, IsString } from 'class-validator';
import { Customer } from '../customer.model';
import { InvoiceData } from '../invoice.model';
import { TrackingDataRequest } from '../tracking.user.model';

export class ChargeTransactionRequest {
  @IsString()
  PaymentType: string;

  @IsString()
  BankCode: string;

  @IsNumber()
  VaNumber: number;

  InvoiceData: InvoiceData;
  CustomerData: Customer;
  TrackDataRequest: TrackingDataRequest;

  // Include other properties as per your requirements
}