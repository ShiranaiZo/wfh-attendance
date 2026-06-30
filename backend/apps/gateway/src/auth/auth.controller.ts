import { Body, Controller, HttpCode, HttpException, HttpStatus, Inject, Post, UnauthorizedException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { LoginDto } from '@app/contracts/auth/dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(@Inject('USER_SERVICE') private readonly userServiceClient: ClientProxy) { }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async login(@Body() body: LoginDto) {
        const res = await lastValueFrom(
            this.userServiceClient.send({ cmd: 'auth.login' }, body)
        );

        if (!res || !res.success) {
            throw new HttpException(res, HttpStatus.UNAUTHORIZED);
        }

        return res;
    }
}
