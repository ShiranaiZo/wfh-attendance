import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Inject, HttpCode, HttpStatus, HttpException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { UserRoles } from '@app/contracts/helpers/user-roles.helper';
import { Roles } from '@app/contracts/decorators/roles.decorator';
import { AuthGuard } from '@app/contracts/guards/auth.guard';
import { RolesGuard } from '@app/contracts/guards/roles.guard';
import { CreateEmployeeDto } from '@app/contracts/employees/dto/create-employee.dto';
import { UpdateEmployeeDto } from '@app/contracts/employees/dto/update-employee.dto';
import { EMPLOYEES_PATTERNS } from '@app/contracts/employees/employees.pattern';

@UseGuards(AuthGuard, RolesGuard)
@Roles(UserRoles.HRD)
@Controller('employees')
export class EmployeesController {
    constructor(@Inject('USER_SERVICE') private readonly employeeClient: ClientProxy) { }

    @Get()
    async findAll() {
        return lastValueFrom(this.employeeClient.send({ cmd: EMPLOYEES_PATTERNS.FIND_ALL }, {}));
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        const res = await lastValueFrom(this.employeeClient.send({ cmd: EMPLOYEES_PATTERNS.FIND_ONE }, { id }));

        if (!res || !res.success) {
            throw new HttpException(res, res.statusCode);
        }

        return res;
    }

    @Post()
    async create(@Body() body: CreateEmployeeDto) {
        const res = await lastValueFrom(this.employeeClient.send({ cmd: EMPLOYEES_PATTERNS.CREATE }, body));

        if (!res || !res.success) {
            throw new HttpException(res, res.statusCode);
        }

        return res;
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() body: UpdateEmployeeDto) {
        const res = await lastValueFrom(this.employeeClient.send({ cmd: EMPLOYEES_PATTERNS.UPDATE }, { id, updateDto: body }));

        if (!res || !res.success) {
            throw new HttpException(res, res.statusCode);
        }
        return res;
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        const res = await lastValueFrom(this.employeeClient.send({ cmd: EMPLOYEES_PATTERNS.DELETE }, { id }));

        if (!res || !res.success) {
            throw new HttpException(res, res.statusCode);
        }

        return res;
    }
}
