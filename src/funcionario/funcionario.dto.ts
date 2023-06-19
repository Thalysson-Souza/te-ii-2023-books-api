import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested
} from 'class-validator';
import { PessoaDto } from 'src/pessoa/pessoa.dto';
import { Type } from 'class-transformer';

export class FuncionarioDto {
  @IsUUID()
  @IsOptional()
  id?: string;

  @IsNumber()
  @IsNotEmpty()
  salario: number;

  @IsString()
  @IsNotEmpty()
  funcao: string;

  @Type(() => PessoaDto)
  @ValidateNested()
  pessoa: PessoaDto;
}
