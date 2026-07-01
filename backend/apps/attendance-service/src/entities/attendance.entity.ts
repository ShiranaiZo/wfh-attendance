import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('attendances')
export class Attendance {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column()
    userId!: string;

    @Column({ type: 'datetime' })
    clockIn!: Date;

    @Column()
    image!: string;

    @Column({ type: 'text', nullable: true })
    notes?: string;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}
