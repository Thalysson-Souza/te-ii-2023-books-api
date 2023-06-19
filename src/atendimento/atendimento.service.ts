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
    this.validateIsPermitDelete(findById)
    await this.atendimentoEntity.remove(findById);
    return { ...findById, id };
  }

  async create(dto: AtendimentoDto) {
    this.validate(dto);
    this.validateValor(dto);
    const newAutor = this.atendimentoEntity.create(dto);
    return this.atendimentoEntity.save(newAutor);
  }

  async update(dto: AtendimentoDto) {
    await this.findById(dto.id);
    this.validate(dto);
    this.validateValor(dto);
    return this.atendimentoEntity.save(dto);
  }

  validate(dto: AtendimentoDto) {
    if (new Date().getTime() < new Date(dto.data).getTime()) {
      throw new BadRequestException(
        'A data de atendimento do animal não pode ser maior que a data atual',
      );
    }
  }

  validateValor(dto: AtendimentoDto) {
    if (typeof dto.valor !== 'number') {
      throw new BadRequestException(
        'Valor inválido.',
      );
    }
    if (dto.valor < 0) {
      throw new BadRequestException(
        'Valor não pode ser negativo.',
      );
    }
  }

  validateIsPermitDelete(dto: AtendimentoEntity) {
    if (dto.valor > 0 || dto.pago === true) {
      throw new BadRequestException(
        'Só é possível deletar atendimentos com valor igual a R$0,00 e não pago.',
      );
    }
  }


}
