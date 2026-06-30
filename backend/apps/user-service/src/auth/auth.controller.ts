import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { LoginDto } from '@app/contracts/auth/dto/login.dto';



@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @MessagePattern({ cmd: 'auth.login' })
    async login(@Payload() data: LoginDto) {
        const email = data.email || '';
        return this.authService.login(email, data.password);
    }

    @MessagePattern({ cmd: 'auth.verify-token' })
    async verifyToken(@Payload() data: { token: string }) {
        return this.authService.verifyToken(data.token);
    }
}
