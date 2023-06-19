import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import { GeneroEnum } from './genero.enum';
import { AnimalEntity } from 'src/animal/animal.entity';
import { AtendimentoEntity } from 'src/atendimento/atendimento.entity';

@Entity({ name: 'pessoas' })
export class PessoaEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nome: string;

  @Column({ type: 'date', name: 'data_nascimento' })
  dataNascimento: Date;

  @Column()
  cpf: string;

  @Column({
    type: 'enum',
    enum: GeneroEnum,
    default: GeneroEnum.INDEFINIDO,
  })
  genero: GeneroEnum;

  @Column()
  telefone: string;


  @OneToMany(() => AnimalEntity, (animal) => animal.pessoa)
  animais: AnimalEntity[];


}
