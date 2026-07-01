import { Positions } from '@app/contracts/helpers/positions.helper';

export class EmployeeDto {
    id!: string
    name!: string;
    email!: string;
    position?: Positions;
}