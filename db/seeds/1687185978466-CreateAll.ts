import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateAll1687185978466 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO autores (nome)
            VALUES ('William Sheaksphere')
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
