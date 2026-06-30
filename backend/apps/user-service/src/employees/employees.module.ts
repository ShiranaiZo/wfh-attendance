import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeesController } from './employees.controller';
import { EmployeesService } from './employees.service';
import { User } from '../entities/user.entity';

import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        AuthModule,
    ],
    controllers: [EmployeesController],
    providers: [EmployeesService],
})
export class EmployeesModule { }
