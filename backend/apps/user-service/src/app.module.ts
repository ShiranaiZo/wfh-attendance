import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { User } from './entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { EmployeesModule } from './employees/employees.module';
import * as path from 'path';

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
            database: process.env.DB_DATABASE || 'cobanest_employee',
            entities: [User],
            migrations: [path.join(__dirname, 'migrations', '*{.ts,.js}')],
            migrationsRun: true,
            synchronize: false,
            logging: false,
        }),
        AuthModule,
        EmployeesModule,
    ],
})
export class AppModule { }
