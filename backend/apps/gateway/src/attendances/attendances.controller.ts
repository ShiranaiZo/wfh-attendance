import {
    Controller,
    Get,
    Post,
    UseGuards,
    UseInterceptors,
    UploadedFile,
    Body,
    Request,
    BadRequestException,
    Inject,
    Query,
    HttpException,
    HttpStatus,
    Param,
    Res,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ClientProxy } from '@nestjs/microservices';
import { diskStorage } from 'multer';
import * as path from 'path';
import { lastValueFrom } from 'rxjs';
import { AuthGuard } from '@app/contracts/guards/auth.guard';
import { AuthPayloadDto } from '@app/contracts/auth/dto/auth-payload.dto';
import { ATTENDANCES_PATTERN } from '@app/contracts/attendances/attendances.pattern';
import { ParentCreateAttendanceDto } from '@app/contracts/attendances/dto/parent-create-attendance.dto';
import { UserRoles } from '@app/contracts/helpers/user-roles.helper';
import { Roles } from '@app/contracts/decorators/roles.decorator';
import { RolesGuard } from '@app/contracts/guards/roles.guard';
import { MetadataRequest } from '@app/contracts/api/dto/api.dto';

@UseGuards(AuthGuard, RolesGuard)
@Controller('attendances')
export class AttendancesController {
    constructor(@Inject('ATTENDANCE_SERVICE') private readonly attendanceClient: ClientProxy) { }

    @Post('clockin')
    @UseInterceptors(
        FileInterceptor('image', {
            storage: diskStorage({
                destination: './uploads/attendance',
                filename: (req, file, cb) => {
                    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                    const ext = path.extname(file.originalname);
                    cb(null, `wfh-${uniqueSuffix}${ext}`);
                },
            }),
            fileFilter: (_, file, cb) => {
                const allowedExtensions = ['.png', '.jpg', '.jpeg', '.webp'];
                const ext = path.extname(file.originalname).toLowerCase();

                if (!allowedExtensions.includes(ext)) {
                    return cb(new BadRequestException('Only image files (png, jpg, jpeg, webp) are allowed'), false);
                }

                cb(null, true);
            },
        }),
    )
    @Roles(UserRoles.EMPLOYEE)
    async clockIn(
        @Request() req: { user: AuthPayloadDto },
        @UploadedFile() file: Express.Multer.File,
        @Body() body: ParentCreateAttendanceDto,
    ) {
        if (!file) {
            throw new HttpException('Attendance image proof is required', HttpStatus.BAD_REQUEST);
        }

        const image = `${process.env.APP_URL}/${process.env.API_PATH}/${process.env.API_VERSION}/attendances/uploads/${file.filename}`;
        const res = await lastValueFrom(
            this.attendanceClient.send(
                { cmd: ATTENDANCES_PATTERN.CLOCK_IN },
                { userId: req.user.id, image, notes: body.notes }
            )
        );

        if (!res || !res.success) {
            throw new HttpException(res, res.statusCode);
        }

        return res;
    }

    @Get()
    async findAll(
        @Request() req: { user: AuthPayloadDto },
        @Query() query: { date?: string; page?: number; perPage?: number }
    ) {
        const res = await lastValueFrom(
            this.attendanceClient.send(
                { cmd: ATTENDANCES_PATTERN.FIND_ALL },
                {
                    date: query.date,
                    userId: req.user.id,
                    role: req.user.role,
                    metadataRequest: {
                        page: query.page,
                        perPage: query.perPage,
                    },
                }
            )
        );

        if (!res || !res.success) {
            throw new HttpException(res, res.statusCode);
        }

        return res;
    }

    @Get('uploads/:filename')
    async getUploadedFile(
        @Param('filename') filename: string,
        @Request() req: { user: AuthPayloadDto },
        @Res() res: any,
    ) {
        const result = await lastValueFrom(
            this.attendanceClient.send(
                { cmd: ATTENDANCES_PATTERN.FIND_BY_FILENAME },
                { filename }
            )
        );


        if (!result || !result?.success || !result?.data) {
            throw new HttpException('Image not found', HttpStatus.NOT_FOUND);
        }

        const attendance = result.data;
        if (req.user.role !== UserRoles.HRD && req.user.id !== attendance.userId) {
            throw new HttpException('You are not authorized to view this image', HttpStatus.FORBIDDEN);
        }

        const filePath = path.join(process.cwd(), 'uploads', 'attendance', filename);
        return res.sendFile(filePath);
    }
}
