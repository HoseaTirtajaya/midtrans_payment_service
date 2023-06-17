import { IsNumber, IsString, isString } from 'class-validator';

export class InvoiceData {

    @IsString()
    order_id: string;

    @IsNumber()
    gross_amount: number;
}