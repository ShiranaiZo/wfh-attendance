import { Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
        }),
        ClientsModule.register([
            {
                name: 'USER_SERVICE',
                transport: Transport.TCP,
                options: {
                    host: process.env.API_USER_SERVICE_HOST || '127.0.0.1',
                    port: parseInt(process.env.API_USER_SERVICE_PORT || '3001', 10),
                },
            },
        ]),
    ],
    controllers: [AuthController],
    providers: [],
})
export class AppModule { }
