import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @MessagePattern({ cmd: 'auth.login' })
    async login(@Payload() data: { email?: string; username?: string; password: string }) {
        const email = data.email || data.username || '';
        return this.authService.login(email, data.password);
    }

    @MessagePattern({ cmd: 'auth.verify-token' })
    async verifyToken(@Payload() data: { token: string }) {
        return this.authService.verifyToken(data.token);
    }
}
