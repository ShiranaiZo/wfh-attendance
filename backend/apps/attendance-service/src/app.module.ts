import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Attendance } from './entities/attendance.entity';
import * as path from 'path';
import { ClientsModule, Transport } from '@nestjs/microservices';


@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
        }),
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: process.env.DB_HOST || '127.0.0.1',
            port: parseInt(process.env.DB_PORT || '3306', 10),
            username: process.env.DB_USERNAME || 'root',
            password: process.env.DB_PASSWORD || '',
            database: process.env.DB_DATABASE || '',
            entities: [Attendance],
            migrations: [path.join(__dirname, 'migrations', '*{.ts,.js}')],
            migrationsRun: true,
            synchronize: false,
            logging: false,
        }),
        TypeOrmModule.forFeature([Attendance]),
        ClientsModule.register([
            {
                name: 'USER_SERVICE',
                transport: Transport.TCP,
                options: {
                    host: '127.0.0.1',
                    port: 3002,
                },
            },
        ]),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
