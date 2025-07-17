import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTable1752764067006 implements MigrationInterface {
    name = 'CreateUserTable1752764067006'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "email" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "herramienta" ("id" SERIAL NOT NULL, "nombre" character varying NOT NULL, "descripcion" character varying NOT NULL, "uso" character varying, "proceso" text array NOT NULL, "esterilizacion" character varying, CONSTRAINT "UQ_6f7d1d99c2dda647bb8d02dfe7b" UNIQUE ("nombre"), CONSTRAINT "PK_aa654b814d478bf5b5e85bbb0f4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "registro_herramienta" ("id" SERIAL NOT NULL, "estado" character varying NOT NULL, "fecha" TIMESTAMP NOT NULL DEFAULT now(), "herramientaId" integer, CONSTRAINT "PK_41efe19c38121370f3416e07697" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "photo" ("id" SERIAL NOT NULL, "url" character varying NOT NULL, "userId" integer, CONSTRAINT "PK_723fa50bf70dcfd06fb5a44d4ff" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "registro_herramienta" ADD CONSTRAINT "FK_e0c1fb603f2d352f841239da542" FOREIGN KEY ("herramientaId") REFERENCES "herramienta"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "photo" ADD CONSTRAINT "FK_4494006ff358f754d07df5ccc87" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "photo" DROP CONSTRAINT "FK_4494006ff358f754d07df5ccc87"`);
        await queryRunner.query(`ALTER TABLE "registro_herramienta" DROP CONSTRAINT "FK_e0c1fb603f2d352f841239da542"`);
        await queryRunner.query(`DROP TABLE "photo"`);
        await queryRunner.query(`DROP TABLE "registro_herramienta"`);
        await queryRunner.query(`DROP TABLE "herramienta"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
