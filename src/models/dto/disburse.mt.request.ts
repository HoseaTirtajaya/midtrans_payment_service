import { IsNumber, IsString } from 'class-validator';

export class DisbursementRequestDto {
  @IsNumber()
  amount: number;

  @IsString()
  bankCode: string;

  @IsString()
  accountNumber: string;

  // Include other properties as per your requirements
}