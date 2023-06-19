import { AtendimentoEntity } from 'src/atendimento/atendimento.entity';
import { PessoaEntity } from 'src/pessoa/pessoa.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm';

@Entity({ name: 'pessoas' })
export class FuncionarioEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'decimal', default: 0 })
  salario: number;

  @Column()
  funcao: string;

  @OneToOne(
    () => PessoaEntity,
    { eager: true },
  )
  @JoinColumn({
    name: 'pessoa_id',
    foreignKeyConstraintName: 'pessoa_fk',
    referencedColumnName: 'id',
  })
  pessoa: PessoaEntity;

  @OneToMany(() => AtendimentoEntity, (atendimento) => atendimento.funcionario)
  atendimentos: AtendimentoEntity[];
}
