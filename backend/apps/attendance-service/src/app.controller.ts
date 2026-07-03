import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ATTENDANCES_PATTERN } from '@app/contracts/attendances/attendances.pattern';
import { CreateAttendanceDto } from '@app/contracts/attendances/dto/create-attendance.dto';
import { MetadataRequest } from '@app/contracts/api/dto/api.dto';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) { }

    @MessagePattern({ cmd: ATTENDANCES_PATTERN.FIND_ALL })
    async findAll(@Payload() data: { date?: string, userId: string; role: string, metadataRequest: MetadataRequest }) {
        if (data.role == 'HRD') {
            return this.appService.findAll(data?.date, data?.metadataRequest);
        } else {
            return this.appService.findAllByEmployee(data.userId);
        }
    }

    @MessagePattern({ cmd: ATTENDANCES_PATTERN.CLOCK_IN })
    async clockIn(@Payload() data: CreateAttendanceDto) {
        return this.appService.clockIn(data);
    }

    @MessagePattern({ cmd: ATTENDANCES_PATTERN.FIND_BY_FILENAME })
    async findImageByFilename(@Payload() data: { filename: string }) {
        return this.appService.findImageByFilename(data.filename);
    }
}
