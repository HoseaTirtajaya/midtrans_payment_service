import { IsString } from 'class-validator';

export class Customer {
  @IsString()
  Email: string;

  @IsString()
  FirstName: string;

  @IsString()
  LastName: string;

  @IsString()
  PhoneNumber: string;

  
}