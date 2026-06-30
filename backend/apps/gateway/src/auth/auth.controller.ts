import { Body, Controller, HttpCode, HttpStatus, Inject, Post, UnauthorizedException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Controller('auth')
export class AuthController {
    constructor(@Inject('USER_SERVICE') private readonly userServiceClient: ClientProxy) { }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async login(@Body() body: any) {
        const res = await lastValueFrom(
            this.userServiceClient.send({ cmd: 'auth.login' }, body)
        );

        if (!res || !res.success) {
            throw new UnauthorizedException(res?.message || 'Invalid credentials');
        }

        return res;
    }
}
