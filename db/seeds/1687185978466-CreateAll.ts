import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateAll1687185978466 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO public.pessoas(
                id, nome, data_nascimento, cpf, genero, telefone)
                VALUES ('89ae808e-0ef6-11ee-be56-0242ac120002','Ana','2000-03-19','226.819.381-04','F','40028922');
                
            INSERT INTO public.pessoas(
                id, nome, data_nascimento, cpf, genero, telefone)
                VALUES ('89ae82fa-0ef6-11ee-be56-0242ac120002','Thalysson','199-01-19','226.819.381-04','F','40028922');
        
            INSERT INTO public.animais(
                id, nome, data_nascimento, descricao, genero, pessoa_id)
                VALUES ('89ae78f0-0ef6-11ee-be56-0242ac120002', 'Thor', '2022-05-10' 'Cachorro de meia idade', 'M','89ae808e-0ef6-11ee-be56-0242ac120002');
                
            INSERT INTO public.animais(
                id, nome, data_nascimento, descricao, genero, pessoa_id)
                VALUES ('89ae7e72-0ef6-11ee-be56-0242ac120002', 'Thora, '2021-05-15' 'Cachorro de adulto', 'F','89ae82fa-0ef6-11ee-be56-0242ac120002');
                        
            INSERT INTO public.funcionarios(
                id, salario, funcao, pessoa_id)
                VALUES ('89ae866a-0ef6-11ee-be56-0242ac120002', 2560, 'Veterinário', '89ae808e-0ef6-11ee-be56-0242ac120002');
                    
            INSERT INTO public.funcionarios(
                id, salario, funcao, pessoa_id)
                VALUES ('89ae88cc-0ef6-11ee-be56-0242ac120002', 3000, 'Veterinária', '89ae82fa-0ef6-11ee-be56-0242ac120002');
                    
            INSERT INTO public.atendimentos(
                id, data_atendida, valor, pago, animal_id, funcionario_id)
                VALUES ('89ae8a84-0ef6-11ee-be56-0242ac120002', '2023-06-15', 150.5, true, '89ae78f0-0ef6-11ee-be56-0242ac120002', '89ae866a-0ef6-11ee-be56-0242ac120002');
                        
            INSERT INTO public.atendimentos(
                id, data_atendida, valor, pago, animal_id, funcionario_id)
                VALUES ('89ae8d18-0ef6-11ee-be56-0242ac120002', '2023-06-01', 150.5, false, '89ae78f0-0ef6-11ee-be56-0242ac120002', '89ae88cc-0ef6-11ee-be56-0242ac120002')
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM public.pessoas
                WHERE id = '89ae808e-0ef6-11ee-be56-0242ac120002';
                
            DELETE FROM public.pessoas
                WHERE id = '89ae82fa-0ef6-11ee-be56-0242ac120002';

            DELETE FROM public.animais
                WHERE id='89ae78f0-0ef6-11ee-be56-0242ac120002';
                
            DELETE FROM public.animais
                WHERE id='89ae7e72-0ef6-11ee-be56-0242ac120002'

            DELETE FROM public.funcionarios
                WHERE id='89ae866a-0ef6-11ee-be56-0242ac120002x';
                
            DELETE FROM public.funcionarios
                WHERE id='89ae88cc-0ef6-11ee-be56-0242ac120002';

            DELETE FROM public.atendimentos
                WHERE id='89ae8d18-0ef6-11ee-be56-0242ac120002';

            DELETE FROM public.atendimentos
                WHERE id='89ae8a84-0ef6-11ee-be56-0242ac120002';       
        `)
    }

}
