import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

export enum UserRole {
    HRD = 'HRD',
    EMPLOYEE = 'EMPLOYEE',
}

export enum Positions {
    FRONTEND_DEVELOPER = 'Frontend Developer',
    BACKEND_DEVELOPER = 'Backend Developer',
    FULLSTACK_DEVELOPER = 'Full Stack Developer',
    QA_ENGINEER = 'QA Engineer',
}

@Entity('users')
export class User {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ unique: true })
    email!: string;

    @Column()
    password!: string;

    @Column()
    name!: string;

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.EMPLOYEE,
    })
    role!: UserRole;

    @Column({
        type: 'enum',
        enum: Positions,
    })
    position!: Positions;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}
