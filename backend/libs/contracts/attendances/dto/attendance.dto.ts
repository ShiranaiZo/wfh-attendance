import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ParentCreateAttendanceDto } from './parent-create-attendance.dto';
import { EmployeeDto } from '@app/contracts/employees/dto/employee.dto';

export class AttendanceDto {
    image!: string;
    notes?: string;
    employee?: EmployeeDto;
}
