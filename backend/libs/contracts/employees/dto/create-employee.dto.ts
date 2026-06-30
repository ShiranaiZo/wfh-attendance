import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { BaseEmployeeDto } from "./base-employee.dto";


export class CreateEmployeeDto extends BaseEmployeeDto {
    @IsEmail({}, { message: 'email must be a valid email address' })
    @IsNotEmpty({ message: 'email is required' })
    email!: string;

    @IsString()
    @IsNotEmpty({ message: 'password is required' })
    @MinLength(8, { message: 'password must be at least 8 characters' })
    password!: string;
}
