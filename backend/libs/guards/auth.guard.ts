import { Injectable, CanActivate, ExecutionContext, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { errorResponse } from '../helpers/response.helper';
import { AUTH_PATTERNS } from '@app/contracts/auth/auth.patterns';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(@Inject('USER_SERVICE') private readonly employeeClient: ClientProxy) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();

        const authHeader = request.headers.authorization || '';
        const token = authHeader.startsWith('Bearer ')
            ? authHeader.split(' ')[1]?.trim()
            : (request.query?.token as string || '');

        if (!token) {
            const res = errorResponse('Unauthorized', 'Please log in first');
            throw new HttpException(res, HttpStatus.UNAUTHORIZED);
        }

        try {
            const user = await lastValueFrom(
                this.employeeClient.send({ cmd: AUTH_PATTERNS.VERIFY_TOKEN }, { token })
            );

            if (!user) {
                const res = errorResponse('Unauthorized', 'Session expired, please log in again');
                throw new HttpException(res, HttpStatus.UNAUTHORIZED);
            }

            request.user = user;
            return true;
        } catch (err) {
            const res = errorResponse('Unauthorized', 'Authentication failed');
            throw new HttpException(res, HttpStatus.UNAUTHORIZED);
        }
    }
}
