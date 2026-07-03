import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from '@app/contracts/employees/dto/create-employee.dto';
import { UpdateEmployeeDto } from '@app/contracts/employees/dto/update-employee.dto';
import { EMPLOYEES_PATTERN } from '@app/contracts/employees/employees.pattern';
import { MetadataRequest } from '@app/contracts/api/dto/api.dto';

@Controller()
export class EmployeesController {
    constructor(private readonly employeesService: EmployeesService) { }

    @MessagePattern({ cmd: EMPLOYEES_PATTERN.FIND_ALL })
    async findAll(@Payload() data: { metadataRequest: MetadataRequest }) {
        return this.employeesService.findAll(data.metadataRequest);
    }

    @MessagePattern({ cmd: EMPLOYEES_PATTERN.FIND_ONE })
    async findOne(@Payload() data: { id: string }) {
        return this.employeesService.findOne(data.id);
    }

    @MessagePattern({ cmd: EMPLOYEES_PATTERN.CREATE })
    async create(@Payload() data: CreateEmployeeDto) {
        return this.employeesService.create(data);
    }

    @MessagePattern({ cmd: EMPLOYEES_PATTERN.UPDATE })
    async update(@Payload() data: { id: string; updateDto: UpdateEmployeeDto }) {
        return this.employeesService.update(data.id, data.updateDto);
    }

    @MessagePattern({ cmd: EMPLOYEES_PATTERN.DELETE })
    async delete(@Payload() data: { id: string }) {
        return this.employeesService.delete(data.id);
    }
}
