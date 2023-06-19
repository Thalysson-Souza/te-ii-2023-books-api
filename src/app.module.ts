import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/data-source';
import { PessoaModule } from './pessoa/pessoa.module';
import { FuncionarioModule } from './funcionario/funcionario.module';
import { AnimalModule } from './animal/animal.module';
import { AtendimentoModule } from './atendimento/atendimento.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    PessoaModule,
    FuncionarioModule,
    AnimalModule,
    AtendimentoModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
