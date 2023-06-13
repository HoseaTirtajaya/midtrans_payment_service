import { Injectable, Optional } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';


@Injectable()
export class AppService {
  private readonly configService: ConfigService;
  private readonly clientProxy: ClientProxy;

  constructor(ConfigService: ConfigService, @Optional() clientProxy?: ClientProxy) {
    this.configService = ConfigService;
    this.clientProxy = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        // Specify the microservice connection options
        // host, port, etc.
        host: '0.0.0.0', 
        port: 2001 
      },
    });
  }

  async createDisbursement(){
    const pattern = { cmd: 'disbursement_mt' };
    const payload = {}; // Additional payload data, if needed

    const result = this.clientProxy.send<any>(pattern, payload);
    const response = await lastValueFrom(result);
    return response;
  }

  disbursementMoney(): any{
    // Perform operations to retrieve data
    const data = {
      message: 'Success!',
      value: "Disbursement Success!",
    };
    return data;
  }
}
