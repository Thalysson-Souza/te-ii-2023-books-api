import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested
} from 'class-validator';
import { PessoaDto } from 'src/pessoa/pessoa.dto';
import { Transform, Type } from 'class-transformer';

export class FuncionarioDto {
  @IsUUID()
  @IsOptional()
  id?: string;

  @IsNumber()
  @IsNotEmpty()
  @Transform(({ value }) => {
    return Number(value);
  })
  salario: number;

  @IsString()
  @IsNotEmpty()
  funcao: string;

  @Type(() => PessoaDto)
  @ValidateNested()
  pessoa: PessoaDto;
}
