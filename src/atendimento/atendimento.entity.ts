import { AnimalEntity } from 'src/animal/animal.entity';
import { FuncionarioEntity } from 'src/funcionario/funcionario.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';

@Entity({ name: 'atendimentos' })
export class AtendimentoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(
    () => AnimalEntity,
    (animal) => animal.atendimentos,
    { eager: true },
  )
  @JoinColumn({
    name: 'animal_id',
    foreignKeyConstraintName: 'animal_fk',
    referencedColumnName: 'id',
  })
  animal: AnimalEntity;

  @ManyToOne(
    () => FuncionarioEntity,
    (funcionario) => funcionario.atendimentos,
    { eager: true },
  )
  @JoinColumn({
    name: 'funcionario_id',
    foreignKeyConstraintName: 'funcionario_fk',
    referencedColumnName: 'id',
  })
  funcionario: FuncionarioEntity;

  @Column({ type: 'date', name: 'data_atendida' })
  data: Date;

  @Column()
  valor: number;

  @Column({ default: false })
  pago: boolean;

}
