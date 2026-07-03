import { IsString, IsOptional, MinLength, MaxLength } from 'class-validator';
import { BaseEmployeeDto } from "./base-employee.dto";

export class UpdateEmployeeDto extends BaseEmployeeDto {
    @IsOptional()
    @IsString()
    @MaxLength(250, { message: 'password is too long' })
    @MinLength(8, { message: 'password must be at least 8 characters' })
    password?: string;
}