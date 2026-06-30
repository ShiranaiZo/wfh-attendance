import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { Positions } from '../../entities/user.entity';

export class BaseEmployeeDto {
    @IsString({ message: 'name must be a string' })
    @IsNotEmpty({ message: 'name is required' })
    name!: string;

    @IsEnum(Positions, { message: `position must be one of: ${Object.values(Positions).join(', ')}` })
    @IsOptional()
    position?: Positions;
}

export class CreateEmployeeDto extends BaseEmployeeDto {
    @IsEmail({}, { message: 'email must be a valid email address' })
    @IsNotEmpty({ message: 'email is required' })
    email!: string;

    @IsString()
    @IsNotEmpty({ message: 'password is required when creating a new employee' })
    @MinLength(8, { message: 'password must be at least 8 characters' })
    password!: string;
}

export class UpdateEmployeeDto extends BaseEmployeeDto {
    @IsOptional()
    @IsString()
    @MinLength(8, { message: 'password must be at least 8 characters' })
    password?: string;
}
