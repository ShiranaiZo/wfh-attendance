import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class AuthPayloadDto {
    id!: string;
    email!: string;
    role!: string;
}