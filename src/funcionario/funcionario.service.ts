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
    this.validateSalario(dto);
    const newAutor = this.funcionarioEntity.create(dto);
    return this.funcionarioEntity.save(newAutor);
  }

  async update(dto: FuncionarioDto) {
    await this.findById(dto.id);
    this.validateSalario(dto);
    return this.funcionarioEntity.save(dto);
  }

  validateSalario(dto: FuncionarioDto) {
    if (dto.salario <= 0) {
      throw new BadRequestException(
        'Salário não pode ser menor ou igual a 0 (Zero).',
      );
    }
  }
}
