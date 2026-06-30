import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { LoginDto } from '@app/contracts/auth/dto/login.dto';
import { AUTH_PATTERNS } from '@app/contracts/auth/auth.patterns';

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @MessagePattern({ cmd: AUTH_PATTERNS.LOGIN })
    async login(@Payload() data: LoginDto) {
        const email = data.email || '';
        return this.authService.login(email, data.password);
    }

    @MessagePattern({ cmd: AUTH_PATTERNS.VERIFY_TOKEN })
    async verifyToken(@Payload() data: { token: string }) {
        return this.authService.verifyToken(data.token);
    }
}
