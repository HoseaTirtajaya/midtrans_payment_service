import { IsNumber, IsString, isString } from 'class-validator';

export class InvoiceData {

    @IsString()
    OrderId: string;

    @IsNumber()
    GrossAmount: number;
}