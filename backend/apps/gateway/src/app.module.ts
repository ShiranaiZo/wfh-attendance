import { Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { EmployeesController } from './employees/employees.controller';
import { AttendancesController } from './attendances/attendances.controller';

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
            {
                name: 'ATTENDANCE_SERVICE',
                transport: Transport.TCP,
                options: {
                    host: process.env.API_ATTENDANCE_SERVICE_HOST || '127.0.0.1',
                    port: parseInt(process.env.API_ATTENDANCE_SERVICE_PORT || '3003', 10),
                },
            },
        ]),
    ],
    controllers: [AuthController, EmployeesController, AttendancesController],
    providers: [],
})
export class AppModule { }
