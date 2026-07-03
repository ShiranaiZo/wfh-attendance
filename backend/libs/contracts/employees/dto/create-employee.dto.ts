import { IsEmail, IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';
import { BaseEmployeeDto } from "./base-employee.dto";


export class CreateEmployeeDto extends BaseEmployeeDto {
    @IsEmail({}, { message: 'email must be a valid email address' })
    @MaxLength(200, { message: 'email is too long' })
    @IsNotEmpty({ message: 'email is required' })
    email!: string;

    @IsString()
    @IsNotEmpty({ message: 'password is required' })
    @MaxLength(250, { message: 'password is too long' })
    @MinLength(8, { message: 'password must be at least 8 characters' })
    password!: string;
}
