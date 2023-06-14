import { Module } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { ConfigService } from 'src/services/ConfigService';

@Module({
  providers: [
    ConfigService,
    {
      provide: 'CLIENT_PROXY',
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: configService.getMidtransServiceHost(), // Fetch host from the config service
            port: configService.getMidtransServicePort(), // Fetch port from the config service
          },
        });
      },
      inject: [ConfigService],
    },
  ],
  exports: ['CLIENT_PROXY', ConfigService],
})
export class SharedModule {}