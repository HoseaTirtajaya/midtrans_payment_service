import { IsString } from 'class-validator';

export class ChargeBankRequest {
  @IsString()
  bank: string;

  @IsString()
  va_number: string;
  // Include other properties as per your requirements
}