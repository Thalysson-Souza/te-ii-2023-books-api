import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID
} from 'class-validator';
import { GeneroEnum } from './genero.enum';

export class PessoaDto {
  @IsUUID()
  @IsOptional()
  id?: string;

  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  @IsNotEmpty()
  cpf: string;

  @IsDateString()
  dataNascimento?: Date | string;

  @IsEnum(GeneroEnum)
  genero?: GeneroEnum;

  @IsString()
  @IsNotEmpty()
  telefone: string;
}
