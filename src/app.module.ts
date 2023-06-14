import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './controller/app.controller';
import { AppService } from './services/app.service';
import { SharedModule } from './shared/ClientProxy';
import { ConfigService } from './services/ConfigService';

@Module({
  imports: [
    ConfigModule.forRoot(), 
    SharedModule
  ],  
  controllers: [AppController],
  providers: [AppService, ConfigService]
})
export class AppModule {}
