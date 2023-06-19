import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AtendimentoEntity } from './atendimento.entity';
import { AtendimentoController } from './atendimento.controller';
import { AtendimentoService } from './atendimento.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([AtendimentoEntity])
  ],
  controllers: [AtendimentoController],
  providers: [AtendimentoService]
})
export class AtendimentoModule { }
