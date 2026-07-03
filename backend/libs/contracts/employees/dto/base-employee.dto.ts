import { Positions } from '@app/contracts/helpers/positions.helper';
import { IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';


export class BaseEmployeeDto {
    @IsString({ message: 'name must be a string' })
    @MaxLength(100, { message: 'name is too long' })
    @IsNotEmpty({ message: 'name is required' })
    name!: string;

    @IsEnum(Positions, { message: `position must be one of: ${Object.values(Positions).join(', ')}` })
    @IsOptional()
    position?: Positions;
}