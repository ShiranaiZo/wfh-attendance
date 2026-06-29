import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1782754234617 implements MigrationInterface {
    name = 'Migrations1782754234617'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` varchar(36) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`role\` enum ('HRD', 'EMPLOYEE') NOT NULL DEFAULT 'EMPLOYEE', \`department\` enum ('HRD', 'TECHNOLOGY', 'MARKETING', 'SALES', 'FINANCE') NOT NULL DEFAULT 'TECHNOLOGY', \`position\` enum ('HR Manager', 'Software Engineer', 'Marketing Manager', 'Sales Manager', 'Finance Manager') NOT NULL DEFAULT 'Software Engineer', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
    }

}
