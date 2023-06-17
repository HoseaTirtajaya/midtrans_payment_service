import { IsString } from 'class-validator';

export class Customer {
  @IsString()
  email: string;

  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsString()
  phone_number: string;

  
}