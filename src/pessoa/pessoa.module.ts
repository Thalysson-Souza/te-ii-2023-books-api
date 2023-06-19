import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PessoaController } from './pessoa.controller';
import { PessoaEntity } from './pessoa.entity';
import { PessoaService } from './pessoa.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([PessoaEntity])
  ],
  controllers: [PessoaController],
  providers: [PessoaService]
})
export class PessoaModule { }
