import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { ensureDatabaseExists } from './database/init-db';

async function bootstrap() {
    await ensureDatabaseExists();

    const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
        transport: Transport.TCP,
        options: {
            host: process.env.APP_HOST || '127.0.0.1',
            port: parseInt(process.env.APP_PORT || '3002', 10),
        },
    });

    await app.listen();
    console.log(`[User Service] TCP Microservice running on port ${process.env.APP_PORT}`);
}
bootstrap();
