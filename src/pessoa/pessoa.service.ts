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
    this.validateNome(dto);
    this.validate(dto);
    this.validateCPF(dto);
    const newAutor = this.pessoaEntity.create(dto);
    return this.pessoaEntity.save(newAutor);
  }

  async update(dto: PessoaDto) {
    await this.findById(dto.id);
    this.validateNome(dto);
    this.validate(dto);
    this.validateCPF(dto);
    return this.pessoaEntity.save(dto);
  }

  validate(dto: PessoaDto) {
    if (new Date().getTime() < new Date(dto.dataNascimento).getTime()) {
      throw new BadRequestException(
        'A data de nascimento da pessoa não pode ser maior que a data atual',
      );
    }
  }

  validateCPF(dto: PessoaDto) {
    let tempIsValid = true;
    let cpf = dto.cpf;
    if (typeof cpf !== "string") tempIsValid = false;
    else {
      cpf = cpf.replace(/[\s.-]*/igm, '')
      if (!cpf || cpf.length != 11 ||
        cpf == "00000000000" ||
        cpf == "11111111111" ||
        cpf == "22222222222" ||
        cpf == "33333333333" ||
        cpf == "44444444444" ||
        cpf == "55555555555" ||
        cpf == "66666666666" ||
        cpf == "77777777777" ||
        cpf == "88888888888" ||
        cpf == "99999999999"
      ) {
        tempIsValid = false
      } else {
        let soma = 0
        let resto
        for (let i = 1; i <= 9; i++)
          soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i)
        resto = (soma * 10) % 11
        if ((resto == 10) || (resto == 11)) resto = 0
        if (resto != parseInt(cpf.substring(9, 10))) tempIsValid = false
        soma = 0
        for (let i = 1; i <= 10; i++)
          soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i)
        resto = (soma * 10) % 11
        if ((resto == 10) || (resto == 11)) resto = 0
        if (resto != parseInt(cpf.substring(10, 11))) tempIsValid = false

        tempIsValid = true
      }
    }
    if (tempIsValid === false) {
      throw new BadRequestException(
        'CPF está inválido.',
      );
    }


  }

  validateNome(dto: PessoaDto) {
    if (dto.nome.toUpperCase().includes('TESTE')) {
      throw new BadRequestException(
        'Nome não pode conter a palavra: TESTE',
      );
    }
  }

}
