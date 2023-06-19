import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FuncionarioEntity } from './funcionario.entity';
import { FuncionarioDto } from './funcionario.dto';

@Injectable()
export class FuncionarioService {
  constructor(
    @InjectRepository(FuncionarioEntity)
    private funcionarioEntity: Repository<FuncionarioEntity>,
  ) { }

  findAll(): Promise<FuncionarioEntity[]> {
    return this.funcionarioEntity.find();
  }

  async findById(id: string): Promise<FuncionarioEntity> {
    const findOne = await this.funcionarioEntity.findOne({ where: { id } });
    if (findOne == null) {
      throw new NotFoundException(
        `Funcionário não encontrado com o identificador ${id}`,
      );
    }
    return findOne;
  }

  async remove(id: string) {
    const findById = await this.findById(id);
    await this.funcionarioEntity.remove(findById);
    return { ...findById, id };
  }

  async create(dto: FuncionarioDto) {
    // this.validate(dto);
    const newAutor = this.funcionarioEntity.create(dto);
    return this.funcionarioEntity.save(newAutor);
  }

  async update(dto: FuncionarioDto) {
    await this.findById(dto.id);
    // this.validate(dto);
    return this.funcionarioEntity.save(dto);
  }

  // validate(dto: FuncionarioDto) {
  //   if (new Date().getTime() < new Date(dto.dataNascimento).getTime()) {
  //     throw new BadRequestException(
  //       'A data de nascimento da pessoa não pode ser menor que a data atual',
  //     );
  //   }
  // }
}
