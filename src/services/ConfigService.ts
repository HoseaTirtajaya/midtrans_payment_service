
import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {
  getMidtransServiceHost(): string {
    // Return the appropriate host value
    return process.env.MIDTRANS_SERVICE_HOST;
  }

  getMidtransServicePort(): number {
    // Return the appropriate port value
    return parseInt(process.env.MIDTRANS_SERVICE_PORT);
  }
}