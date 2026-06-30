import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from '@app/contracts/employees/dto/create-employee.dto';
import { UpdateEmployeeDto } from '@app/contracts/employees/dto/update-employee.dto';
import { EMPLOYEES_PATTERNS } from '@app/contracts/employees/employees.pattern';

@Controller()
export class EmployeesController {
    constructor(private readonly employeesService: EmployeesService) { }

    @MessagePattern({ cmd: EMPLOYEES_PATTERNS.FIND_ALL })
    async findAll() {
        return this.employeesService.findAll();
    }

    @MessagePattern({ cmd: EMPLOYEES_PATTERNS.FIND_ONE })
    async findOne(@Payload() data: { id: string }) {
        return this.employeesService.findOne(data.id);
    }

    @MessagePattern({ cmd: EMPLOYEES_PATTERNS.CREATE })
    async create(@Payload() data: CreateEmployeeDto) {
        return this.employeesService.create(data);
    }

    @MessagePattern({ cmd: EMPLOYEES_PATTERNS.UPDATE })
    async update(@Payload() data: { id: string; updateDto: UpdateEmployeeDto }) {
        return this.employeesService.update(data.id, data.updateDto);
    }

    @MessagePattern({ cmd: EMPLOYEES_PATTERNS.DELETE })
    async delete(@Payload() data: { id: string }) {
        return this.employeesService.delete(data.id);
    }
}
