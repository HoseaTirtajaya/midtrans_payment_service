import { IsString } from 'class-validator';

export class TrackingDataRequest {
  @IsString()
  TrackRequestId: number;

  @IsString()
  Price: string;

  @IsString()
  Quantity: string;

  @IsString()
  name: string;
}