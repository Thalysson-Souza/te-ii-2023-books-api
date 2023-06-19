import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AtendimentoDto } from './atendimento.dto';
import { AtendimentoEntity } from './atendimento.entity';

@Injectable()
export class AtendimentoService {
  constructor(
    @InjectRepository(AtendimentoEntity)
    private atendimentoEntity: Repository<AtendimentoEntity>,
  ) { }

  findAll(): Promise<AtendimentoEntity[]> {
    return this.atendimentoEntity.find();
  }

  async findById(id: string): Promise<AtendimentoEntity> {
    const findOne = await this.atendimentoEntity.findOne({ where: { id } });
    if (findOne == null) {
      throw new NotFoundException(
        `Atendimento não encontrado com o identificador ${id}`,
      );
    }
    return findOne;
  }

  async remove(id: string) {
    const findById = await this.findById(id);
    await this.atendimentoEntity.remove(findById);
    return { ...findById, id };
  }

  async create(dto: AtendimentoDto) {
    this.validate(dto);
    const newAutor = this.atendimentoEntity.create(dto);
    return this.atendimentoEntity.save(newAutor);
  }

  async update(dto: AtendimentoDto) {
    await this.findById(dto.id);
    this.validate(dto);
    return this.atendimentoEntity.save(dto);
  }

  validate(dto: AtendimentoDto) {
    if (new Date().getTime() < new Date(dto.data).getTime()) {
      throw new BadRequestException(
        'A data de atendimento da pessoa não pode ser menor que a data atual',
      );
    }
  }
}
