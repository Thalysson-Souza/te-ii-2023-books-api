import { AtendimentoEntity } from 'src/atendimento/atendimento.entity';
import { PessoaEntity } from 'src/pessoa/pessoa.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import { GeneroEnumA } from './generoA.enum';

@Entity({ name: 'animais' })
export class AnimalEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nome: string;

  @Column({ type: 'date', name: 'data_nascimento' })
  dataNascimento: Date;

  @Column()
  descricao?: string;

  @Column({
    type: 'enum',
    enum: GeneroEnumA,
    default: GeneroEnumA.INDEFINIDO,
  })
  genero: GeneroEnumA;

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

