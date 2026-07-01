import * as mysql from 'mysql2/promise';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.join(__dirname, '..', '.env') });

export async function ensureDatabaseExists() {
    const host = process.env.DB_HOST || '127.0.0.1';
    const port = parseInt(process.env.DB_PORT || '3306', 10);
    const user = process.env.DB_USERNAME || 'root';
    const password = process.env.DB_PASSWORD || '';
    const dbName = process.env.DB_DATABASE || '';

    let connection;

    try {
        connection = await mysql.createConnection({
            host,
            port,
            user,
            password,
        });

        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\`;`);

        console.log(`[Attendance Service] Database "${dbName}" is ready.`);
    } catch (err: any) {
        console.error(`[Attendance Service] Failed to ensure database "${dbName}":`, err.message);
    } finally {
        if (connection) {
            await connection.end();
        }
    }
}
