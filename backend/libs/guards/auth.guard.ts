import { Injectable, CanActivate, ExecutionContext, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { errorResponse } from '../helpers/response.helper';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(@Inject('USER_SERVICE') private readonly employeeClient: ClientProxy) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers.authorization;
        if (!authHeader) {
            const res = errorResponse('Auth Guard', 'Authorization header is missing');
            throw new HttpException(res, HttpStatus.UNAUTHORIZED);

        }

        const [type, token] = authHeader.split(' ');
        if (type !== 'Bearer' || !token) {
            const res = errorResponse('Auth Guard', 'Invalid authorization token format');
            throw new HttpException(res, HttpStatus.UNAUTHORIZED);
        }

        try {
            const user = await lastValueFrom(
                this.employeeClient.send({ cmd: 'auth.verify-token' }, { token })
            );

            if (!user) {
                const res = errorResponse('Auth Guard', 'Invalid or expired token');
                throw new HttpException(res, HttpStatus.UNAUTHORIZED);
            }

            request.user = user;
            return true;
        } catch (err) {
            const res = errorResponse('Auth Guard', 'Token validation failed');
            throw new HttpException(res, HttpStatus.UNAUTHORIZED);
        }
    }
}
