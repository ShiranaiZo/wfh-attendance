import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ParentCreateAttendanceDto } from './parent-create-attendance.dto';

export class CreateAttendanceDto extends ParentCreateAttendanceDto {
    @IsString()
    @IsNotEmpty()
    userId!: string;

    @IsString()
    @IsNotEmpty({ message: 'image is required' })
    image!: string;
}
