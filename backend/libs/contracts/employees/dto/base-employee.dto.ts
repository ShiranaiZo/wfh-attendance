import { Positions } from '@app/contracts/helpers/positions.helper';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';


export class BaseEmployeeDto {
    @IsString({ message: 'name must be a string' })
    @IsNotEmpty({ message: 'name is required' })
    name!: string;

    @IsEnum(Positions, { message: `position must be one of: ${Object.values(Positions).join(', ')}` })
    @IsOptional()
    position?: Positions;
}