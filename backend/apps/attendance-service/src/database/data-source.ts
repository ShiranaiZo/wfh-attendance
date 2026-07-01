import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { Attendance } from '../entities/attendance.entity';

dotenv.config({ path: path.join(__dirname, '..', '..', '.env') });

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST || '127.0.0.1',
    port: parseInt(process.env.DB_PORT || '3306', 10),
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_DATABASE || '',
    entities: [Attendance],
    migrations: [path.join(__dirname, '..', 'migrations', '*{.ts,.js}')],
    synchronize: false,
});
