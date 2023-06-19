import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AnimalEntity } from './animal.entity';
import { AnimalDto } from './animal.dto';

@Injectable()
export class AnimalService {
  constructor(
    @InjectRepository(AnimalEntity)
    private animalEntity: Repository<AnimalEntity>,
  ) { }

  findAll(): Promise<AnimalEntity[]> {
    return this.animalEntity.find();
  }

  async findById(id: string): Promise<AnimalEntity> {
    const findOne = await this.animalEntity.findOne({ where: { id } });
    if (findOne == null) {
      throw new NotFoundException(
        `Animal não encontrado com o identificador ${id}`,
      );
    }
    return findOne;
  }

  async remove(id: string) {
    const findById = await this.findById(id);
    await this.animalEntity.remove(findById);
    return { ...findById, id };
  }

  async create(dto: AnimalDto) {
    this.validate(dto);
    const newAutor = this.animalEntity.create(dto);
    return this.animalEntity.save(newAutor);
  }

  async update(dto: AnimalDto) {
    await this.findById(dto.id);
    this.validate(dto);
    return this.animalEntity.save(dto);
  }

  validate(dto: AnimalDto) {
    if (new Date().getTime() < new Date(dto.dataNascimento).getTime()) {
      throw new BadRequestException(
        'A data de nascimento da pessoa não pode ser menor que a data atual',
      );
    }
  }
}
