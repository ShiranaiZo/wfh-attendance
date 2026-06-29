import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1782756377937 implements MigrationInterface {
    name = 'Migrations1782756377937'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`position\` \`position\` VARCHAR(255) NOT NULL`);
        await queryRunner.query(`UPDATE \`users\` SET \`position\` = 'Backend Developer' WHERE \`position\` NOT IN ('Frontend Developer', 'Backend Developer', 'Full Stack Developer', 'QA Engineer')`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`position\` \`position\` enum ('Frontend Developer', 'Backend Developer', 'Full Stack Developer', 'QA Engineer') NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`position\` \`position\` enum ('HR Manager', 'Software Engineer', 'Marketing Manager', 'Sales Manager', 'Finance Manager') NOT NULL DEFAULT 'Software Engineer'`);
    }

}
