import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../entities/user.entity';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService,
    ) { }

    async login(email: string, pass: string): Promise<any> {
        const user = await this.userRepository
            .createQueryBuilder('user')
            .addSelect('user.password')
            .where('user.email = :email', { email })
            .getOne();

        if (!user) {
            return { success: false, message: 'Invalid credentials' };
        }

        const isMatch = await bcrypt.compare(pass, user.password);
        if (!isMatch) {
            return { success: false, message: 'Invalid credentials' };
        }

        const payload = { id: user.id, email: user.email, role: user.role };
        return {
            success: true,
            access_token: this.jwtService.sign(payload),
        };
    }

    async verifyToken(token: string): Promise<any> {
        try {
            const decoded = this.jwtService.verify(token);

            const user = await this.userRepository.findOne({
                where: { id: decoded.id },
                select: { id: true, email: true, name: true, role: true },
            });

            return user || null;
        } catch {
            return null;
        }
    }
}
