import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  // Create your regular nest application.
  const app = await NestFactory.create(AppModule);

  // Then combine it with your microservice
  const microservice = app.connectMicroservice({
    transport: Transport.TCP,
    options: { 
      host: '0.0.0.0', 
      port: 2001 
    }
  });

  await app.startAllMicroservices();
  await app.listen(8003);
}
bootstrap();
