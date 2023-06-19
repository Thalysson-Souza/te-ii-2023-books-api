import {
  Injectable
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AnimalEntity } from 'src/animal/animal.entity';
import { FuncionarioEntity } from 'src/funcionario/funcionario.entity';
import { PessoaEntity } from 'src/pessoa/pessoa.entity';
import { Repository } from 'typeorm';
import { DashboardDto } from './dashboard.dto';

@Injectable()
export class DashboadService {
  constructor(
    @InjectRepository(FuncionarioEntity)
    private funcionarioEntity: Repository<FuncionarioEntity>,
    @InjectRepository(AnimalEntity)
    private animalEntity: Repository<AnimalEntity>,
    @InjectRepository(PessoaEntity)
    private pessoaEntity: Repository<PessoaEntity>,
  ) { }

  async getCountTotal(): Promise<DashboardDto> {
    let response_temp: DashboardDto = {
      count_animais: 0,
      count_funcionarios: 0,
      count_pessoas: 0
    };
    response_temp.count_funcionarios = await this.funcionarioEntity.count();
    response_temp.count_animais = await this.animalEntity.count();
    response_temp.count_pessoas = await this.pessoaEntity.count();
    return response_temp
  }



}
