import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAll1687182460800 implements MigrationInterface {
    name = 'CreateAll1687182460800'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pessoas" DROP CONSTRAINT "pessoa_fk"`);
        await queryRunner.query(`ALTER TABLE "atendimentos" DROP CONSTRAINT "animal_fk"`);
        await queryRunner.query(`ALTER TABLE "atendimentos" DROP CONSTRAINT "funcionario_fk"`);
        await queryRunner.query(`CREATE TYPE "public"."animais_genero_enum" AS ENUM('F', 'M', 'I')`);
        await queryRunner.query(`CREATE TABLE "animais" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" character varying NOT NULL, "data_nascimento" date NOT NULL, "descricao" character varying NOT NULL, "genero" "public"."animais_genero_enum" NOT NULL DEFAULT 'I', "pessoa_id" uuid, CONSTRAINT "PK_80a52ded49b9f912c01c566a334" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "funcionarios" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "salario" numeric NOT NULL DEFAULT '0', "funcao" character varying NOT NULL, "pessoa_id" uuid, CONSTRAINT "REL_417374b23a7ef694bc1f476ff0" UNIQUE ("pessoa_id"), CONSTRAINT "PK_a6ee7c0e30d968db531ad073337" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "pessoas" DROP COLUMN "salario"`);
        await queryRunner.query(`ALTER TABLE "pessoas" DROP COLUMN "funcao"`);
        await queryRunner.query(`ALTER TABLE "pessoas" DROP COLUMN "pessoa_id"`);
        await queryRunner.query(`ALTER TABLE "pessoas" DROP COLUMN "descricao"`);
        await queryRunner.query(`ALTER TABLE "animais" ADD CONSTRAINT "pessoa_fk" FOREIGN KEY ("pessoa_id") REFERENCES "pessoas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "funcionarios" ADD CONSTRAINT "pessoa_fk" FOREIGN KEY ("pessoa_id") REFERENCES "pessoas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "atendimentos" ADD CONSTRAINT "animal_fk" FOREIGN KEY ("animal_id") REFERENCES "animais"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "atendimentos" ADD CONSTRAINT "funcionario_fk" FOREIGN KEY ("funcionario_id") REFERENCES "funcionarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "atendimentos" DROP CONSTRAINT "funcionario_fk"`);
        await queryRunner.query(`ALTER TABLE "atendimentos" DROP CONSTRAINT "animal_fk"`);
        await queryRunner.query(`ALTER TABLE "funcionarios" DROP CONSTRAINT "pessoa_fk"`);
        await queryRunner.query(`ALTER TABLE "animais" DROP CONSTRAINT "pessoa_fk"`);
        await queryRunner.query(`ALTER TABLE "pessoas" ADD "descricao" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pessoas" ADD "pessoa_id" uuid`);
        await queryRunner.query(`ALTER TABLE "pessoas" ADD "funcao" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pessoas" ADD "salario" numeric NOT NULL DEFAULT '0'`);
        await queryRunner.query(`DROP TABLE "funcionarios"`);
        await queryRunner.query(`DROP TABLE "animais"`);
        await queryRunner.query(`DROP TYPE "public"."animais_genero_enum"`);
        await queryRunner.query(`ALTER TABLE "atendimentos" ADD CONSTRAINT "funcionario_fk" FOREIGN KEY ("funcionario_id") REFERENCES "pessoas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "atendimentos" ADD CONSTRAINT "animal_fk" FOREIGN KEY ("animal_id") REFERENCES "pessoas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pessoas" ADD CONSTRAINT "pessoa_fk" FOREIGN KEY ("pessoa_id") REFERENCES "pessoas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
