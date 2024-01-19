import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1693922296622 implements MigrationInterface {
    name = 'Init1693922296622'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "standup" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "standup_id" character varying NOT NULL, "user_id" character varying NOT NULL, "text" character varying NOT NULL, "ts" double precision NOT NULL, CONSTRAINT "PK_0711a7bc0719d8b762f191376f9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("user_id" character varying(20) NOT NULL, "username" character varying NOT NULL, "role" character varying NOT NULL, CONSTRAINT "PK_758b8ce7c18b9d347461b30228d" PRIMARY KEY ("user_id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "standup"`);
    }

}
