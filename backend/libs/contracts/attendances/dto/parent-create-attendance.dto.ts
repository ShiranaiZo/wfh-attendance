import { IsEmail, IsNotEmpty, IsString, IsOptional, } from 'class-validator';

export class ParentCreateAttendanceDto {
    @IsString({ message: 'notes must be a string' })
    @IsOptional()
    notes?: string;
}
