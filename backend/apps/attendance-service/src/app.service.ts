import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Attendance } from './entities/attendance.entity';
import { Between, Repository, Like } from 'typeorm';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { EMPLOYEES_PATTERN } from '@app/contracts/employees/employees.pattern';
import { EmployeeDto } from '@app/contracts/employees/dto/employee.dto';
import { AttendanceDto } from '@app/contracts/attendances/dto/attendance.dto';
import { errorResponse, successResponse } from '@app/contracts/helpers/response.helper';
import { CreateAttendanceDto } from '@app/contracts/attendances/dto/create-attendance.dto';
import { plainToInstance } from 'class-transformer';
import { ApiResponse, Metadata, MetadataRequest } from '@app/contracts/api/dto/api.dto';
import { format } from 'date-fns';


@Injectable()
export class AppService {
    constructor(
        @InjectRepository(Attendance)
        private readonly attendanceRepository: Repository<Attendance>,
        @Inject('USER_SERVICE')
        private readonly userClient: ClientProxy,
    ) { }

    async findAll(date?: string, metadataRequest?: MetadataRequest): Promise<ApiResponse> {
        const page = metadataRequest?.page ?? 1;
        const perPage = metadataRequest?.perPage ?? 10;

        const [attendances, totalCount] = await this.attendanceRepository.findAndCount({
            where: date
                ? {
                    clockIn: Between(
                        new Date(`${date}T00:00:00`),
                        new Date(`${date}T23:59:59.999`),
                    ),
                }
                : undefined,
            order: { clockIn: 'DESC' },
            skip: (page - 1) * perPage,
            take: perPage,
        });

        const pageCount = Math.ceil(totalCount / perPage);

        const metadata: Metadata = {
            page,
            perPage,
            pageCount,
            totalCount,
            links: {
                next: page < pageCount ? `?page=${page + 1}&perPage=${perPage}` : null,
                previous: page > 1 ? `?page=${page - 1}&perPage=${perPage}` : null,
            },
        };


        let employees: EmployeeDto[] = [];
        try {
            const res = await lastValueFrom(
                this.userClient.send<any>({ cmd: EMPLOYEES_PATTERN.FIND_ALL }, {})
            );

            if (res && res.success && Array.isArray(res?.data)) {
                employees = res?.data;
            }
        } catch (err: any) {
            console.error('[Attendance Service] Failed to fetch employees data:', err.message);
        }

        const employeeMap = new Map(employees.map((p) => [p.id, p]));

        const result = attendances.map((attendance) => ({
            ...attendance,
            employee: employeeMap.get(attendance.userId),
        }));

        return successResponse({ title: 'Attendances', message: 'Successfully retrieved all employees attendances', data: result, metadata });
    }

    async findAllByEmployee(userId: string): Promise<ApiResponse> {
        const attendances = await this.attendanceRepository.find({
            where: { userId },
            order: { clockIn: 'DESC' },
        });

        return successResponse({ title: 'Attendances', message: 'Successfully retrieved user attendances', data: attendances });
    }

    async clockIn(data: CreateAttendanceDto): Promise<ApiResponse> {
        const checkAttendanceToday = await this.checkAttendanceToday(data.userId);
        if (checkAttendanceToday) {
            return errorResponse({ title: 'Attendance Exists', message: 'You already clocked in today' });
        }

        const attendance = new Attendance();
        attendance.userId = data.userId;
        attendance.clockIn = new Date();
        attendance.image = data.image;
        attendance.notes = data.notes;

        const saved = await this.attendanceRepository.save(attendance);
        return successResponse({ title: 'Attendances', message: 'Successfully clocked in', data: saved });
    }

    async checkAttendanceToday(id: string): Promise<AttendanceDto | null> {
        const today = format(new Date(), 'yyyy-MM-dd');

        const attendance = await this.attendanceRepository.findOne({
            where: {
                userId: id,
                clockIn: Between(
                    new Date(`${today}T00:00:00`),
                    new Date(`${today}T23:59:59.999`),
                ),
            }
        });

        return attendance;
    }

    async findImageByFilename(filename: string): Promise<ApiResponse> {
        const attendance = await this.attendanceRepository.findOne({
            where: {
                image: Like(`%/${filename}`),
            },
        });

        return successResponse({ title: 'Attendances', message: 'Successfully retrieved attendance by image', data: attendance });
    }
}
