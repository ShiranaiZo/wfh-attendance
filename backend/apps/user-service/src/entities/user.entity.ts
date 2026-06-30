import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn } from 'typeorm';
import { UserRoles } from '@app/contracts/helpers/user-roles.helper';
import { Positions } from '@app/contracts/helpers/positions.helper';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ unique: true })
    email!: string;

    @Column({ select: false })
    password!: string;

    @Column()
    name!: string;

    @Column({
        type: 'enum',
        enum: UserRoles,
        default: UserRoles.EMPLOYEE,
    })
    role!: UserRoles;

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
