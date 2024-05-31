import { MigrationInterface, QueryRunner } from "typeorm";

export class AddThreadSchema1717061022987 implements MigrationInterface {
    name = 'AddThreadSchema1717061022987'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "threads" ("id" SERIAL NOT NULL, "content" character varying NOT NULL, "image" character varying, "create_at" TIMESTAMP NOT NULL DEFAULT now(), "posted_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_d8a74804c34fc3900502cd27275" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "threads"`);
    }

}
