import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { EmployeesService } from './employees.service';

@Controller()
export class EmployeesController {
    constructor(private readonly employeesService: EmployeesService) { }

    @MessagePattern({ cmd: 'employee.find-all' })
    async findAll() {
        return this.employeesService.findAll();
    }

    @MessagePattern({ cmd: 'employee.find-by-id' })
    async findOne(@Payload() data: { id: string }) {
        return this.employeesService.findOne(data.id);
    }

    @MessagePattern({ cmd: 'employee.create' })
    async create(@Payload() data: any) {
        return this.employeesService.create(data);
    }

    @MessagePattern({ cmd: 'employee.update' })
    async update(@Payload() data: { id: string; updateDto: any }) {
        return this.employeesService.update(data.id, data.updateDto);
    }

    @MessagePattern({ cmd: 'employee.delete' })
    async delete(@Payload() data: { id: string }) {
        await this.employeesService.delete(data.id);
        return { success: true };
    }
}
