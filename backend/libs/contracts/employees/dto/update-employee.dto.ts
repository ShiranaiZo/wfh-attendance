import { IsString, IsOptional, MinLength } from 'class-validator';
import { BaseEmployeeDto } from "./base-employee.dto";

export class UpdateEmployeeDto extends BaseEmployeeDto {
    @IsOptional()
    @IsString()
    @MinLength(8, { message: 'password must be at least 8 characters' })
    password?: string;
}