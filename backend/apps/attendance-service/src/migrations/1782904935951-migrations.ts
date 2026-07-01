import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1782904935951 implements MigrationInterface {
    name = 'Migrations1782904935951'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`attendances\` (\`id\` varchar(36) NOT NULL, \`userId\` varchar(255) NOT NULL, \`clockIn\` datetime NOT NULL, \`image\` varchar(255) NOT NULL, \`notes\` text NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`attendances\``);
    }

}
