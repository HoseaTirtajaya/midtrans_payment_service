import { IsNumber, IsString, isNumber } from 'class-validator';

export class TrackingDataRequest {
  @IsNumber()
  id: number;

  @IsNumber()
  price: number;

  @IsNumber()
  quantity: number;

  @IsString()
  name: string;
}