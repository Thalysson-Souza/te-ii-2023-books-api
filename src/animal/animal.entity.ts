import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import { GeneroEnum } from './genero.enum';
import { PessoaEntity } from 'src/pessoa/pessoa.entity';
import { AtendimentoEntity } from 'src/atendimento/atendimento.entity';

@Entity({ name: 'pessoas' })
export class AnimalEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nome: string;

  @Column({ type: 'date', name: 'data_nascimento' })
  dataNascimento: Date;

  @Column()
  descricao: string;

  @Column({
    type: 'enum',
    enum: GeneroEnum,
    default: GeneroEnum.INDEFINIDO,
  })
  genero: GeneroEnum;

  @ManyToOne(
    () => PessoaEntity,
    (pessoa) => pessoa.animais,
    { eager: true },
  )
  @JoinColumn({
    name: 'pessoa_id',
    foreignKeyConstraintName: 'pessoa_fk',
    referencedColumnName: 'id',
  })
  pessoa: PessoaEntity;

  @OneToMany(() => AtendimentoEntity, (atendimento) => atendimento.animal)
  atendimentos: AtendimentoEntity[];
}

