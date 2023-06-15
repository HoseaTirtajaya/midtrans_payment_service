import { IsNumber, IsString } from 'class-validator';
import { Customer } from '../customer.model';
import { InvoiceData } from '../invoice.model';

export class ChargeTransactionRequest {
  @IsString()
  BankCode: string;

  @IsNumber()
  VaNumber: number;

  InvoiceData: InvoiceData;
  CustomerData: Customer;

  // Include other properties as per your requirements
}