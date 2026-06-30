import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Positions, User, UserRole } from '../entities/user.entity';
import { plainToInstance } from 'class-transformer';
import { CreateEmployeeDto, UpdateEmployeeDto } from './dto/employee.dto';
import { validate } from 'class-validator';
import { ApiResponse, successResponse, errorResponse } from '../../../../libs/contracts/src/helpers/response.helper';

@Injectable()
export class EmployeesService implements OnModuleInit {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    async onModuleInit() {
        try {
            const count = await this.userRepository.count();
            if (count === 0) {

                const adminPass = await bcrypt.hash('hr123', 10);
                const empPass = await bcrypt.hash('employee123', 10);

                const admin = new User();
                admin.id = "550e8400-e29b-41d4-a716-446655440000";
                admin.email = 'hr@gmail.com';
                admin.password = adminPass;
                admin.name = 'Budi Setiabudi';
                admin.role = UserRole.HRD;

                const emp1 = new User();
                emp1.id = "550e8400-e29b-41d4-a716-446655440001";
                emp1.email = 'employee1@gmail.com';
                emp1.password = empPass;
                emp1.name = 'Wawan Setiawan';
                emp1.role = UserRole.EMPLOYEE;
                emp1.position = Positions.FRONTEND_DEVELOPER;

                const emp2 = new User();
                emp2.id = "550e8400-e29b-41d4-a716-446655440002";
                emp2.email = 'employee2@gmail.com';
                emp2.password = empPass;
                emp2.name = 'Budi Santoso';
                emp2.role = UserRole.EMPLOYEE;
                emp2.position = Positions.BACKEND_DEVELOPER;

                await this.userRepository.save([admin, emp1, emp2]);
            }
        } catch (err: any) {
            console.error('[Employees Module] Seeding error:', err.message);
        }
    }

    async findAll(): Promise<ApiResponse<User[]>> {
        const employees = await this.userRepository.find({
            where: { role: UserRole.EMPLOYEE },
            order: { id: 'DESC' },
        });
        return successResponse('Employees', 'Successfully retrieved all employees', employees);
    }

    async findOne(id: string): Promise<ApiResponse<User>> {
        const employee = await this.userRepository.findOne({
            where: { id, role: UserRole.EMPLOYEE },
        });

        if (!employee) {
            return errorResponse('Employees', 'Employee not found', [`Employee with ID ${id} not found`]);
        }

        return successResponse('Employees', 'Successfully retrieved employee', employee);
    }

    async create(data: any): Promise<ApiResponse<User>> {
        const dto = plainToInstance(CreateEmployeeDto, data);
        const errors = await validate(dto);
        if (errors.length > 0) {
            return errorResponse(
                'Employees',
                'Validation failed',
                errors.flatMap((e) => Object.values(e.constraints || {})),
            );
        }

        const user = new User();
        user.email = dto.email;
        user.name = dto.name;
        user.role = UserRole.EMPLOYEE;
        if (dto.position) user.position = dto.position;
        user.password = await bcrypt.hash(dto.password, 10);

        const saved = await this.userRepository.save(user);
        return successResponse('Employees', 'Successfully created employee', saved);
    }

    async update(id: string, data: any): Promise<ApiResponse<User>> {
        const dto = plainToInstance(UpdateEmployeeDto, data);
        const errors = await validate(dto);
        if (errors.length > 0) {
            return errorResponse(
                'Employees',
                'Validation failed',
                errors.flatMap((e) => Object.values(e.constraints || {})),
            );
        }

        const user = await this.userRepository.findOne({
            where: { id, role: UserRole.EMPLOYEE },
        });

        if (!user) {
            return errorResponse('Employees', 'Employee not found', [`Employee with ID ${id} not found`]);
        }

        user.name = dto.name;
        if (dto.position !== undefined) user.position = dto.position;
        if (dto.password) {
            user.password = await bcrypt.hash(dto.password, 10);
        }

        const saved = await this.userRepository.save(user);
        return successResponse('Employees', 'Successfully updated employee', saved);
    }

    async delete(id: string): Promise<ApiResponse> {
        const user = await this.userRepository.findOne({
            where: { id, role: UserRole.EMPLOYEE },
        });

        if (!user) {
            return errorResponse('Employees', 'Employee not found', [`Employee with ID ${id} not found`]);
        }

        await this.userRepository.remove(user);
        return successResponse('Employees', 'Successfully deleted employee');
    }
}