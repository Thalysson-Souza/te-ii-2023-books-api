import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested
} from 'class-validator';
import { GeneroEnumA } from './generoA.enum';
import { Type } from 'class-transformer';
import { PessoaDto } from 'src/pessoa/pessoa.dto';

export class AnimalDto {
  @IsUUID()
  @IsOptional()
  id?: string;

  @Type(() => PessoaDto)
  @ValidateNested()
  pessoa: PessoaDto;

  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsDateString()
  dataNascimento?: Date | string;

  @IsString()
  @IsOptional()
  descricao: string;

  @IsEnum(GeneroEnumA)
  genero?: GeneroEnumA;

}
