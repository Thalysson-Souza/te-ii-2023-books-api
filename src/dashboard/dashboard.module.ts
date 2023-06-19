import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardController } from './dashboard.controller';
import { DashboadService } from './dashboard.service';
import { AnimalService } from 'src/animal/animal.service';
import { FuncionarioService } from 'src/funcionario/funcionario.service';
import { FuncionarioEntity } from 'src/funcionario/funcionario.entity';
import { AnimalEntity } from 'src/animal/animal.entity';
import { PessoaEntity } from 'src/pessoa/pessoa.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([FuncionarioEntity, AnimalEntity, PessoaEntity])
  ],
  controllers: [DashboardController],
  providers: [DashboadService, AnimalService, FuncionarioService]
})
export class DashboardModule { }
