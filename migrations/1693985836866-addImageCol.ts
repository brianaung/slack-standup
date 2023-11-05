import { MigrationInterface, QueryRunner } from "typeorm";

export class AddImageCol1693985836866 implements MigrationInterface {
    name = 'AddImageCol1693985836866'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "image" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "image"`);
    }

}
