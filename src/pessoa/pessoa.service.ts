import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PessoaDto } from './pessoa.dto';
import { PessoaEntity } from './pessoa.entity';

@Injectable()
export class PessoaService {
  constructor(
    @InjectRepository(PessoaEntity)
    private pessoaEntity: Repository<PessoaEntity>,
  ) { }

  findAll(): Promise<PessoaEntity[]> {
    return this.pessoaEntity.find();
  }

  async findById(id: string): Promise<PessoaEntity> {
    const findOne = await this.pessoaEntity.findOne({ where: { id } });
    if (findOne == null) {
      throw new NotFoundException(
        `Pessoa não encontrado com o identificador ${id}`,
      );
    }
    return findOne;
  }

  async remove(id: string) {
    const findById = await this.findById(id);
    await this.pessoaEntity.remove(findById);
    return { ...findById, id };
  }

  async create(dto: PessoaDto) {
    this.validate(dto);
    const newAutor = this.pessoaEntity.create(dto);
    return this.pessoaEntity.save(newAutor);
  }

  async update(dto: PessoaDto) {
    await this.findById(dto.id);
    this.validate(dto);
    return this.pessoaEntity.save(dto);
  }

  validate(dto: PessoaDto) {
    if (new Date().getTime() < new Date(dto.dataNascimento).getTime()) {
      throw new BadRequestException(
        'A data de nascimento da pessoa não pode ser menor que a data atual',
      );
    }
  }
}
