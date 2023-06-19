import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
  isNumber
} from 'class-validator';
import { PessoaDto } from 'src/pessoa/pessoa.dto';
import { Transform, Type } from 'class-transformer';

export class DashboardDto {

  @IsNumber()
  @IsOptional()
  count_animais?: number;

  @IsNumber()
  @IsOptional()
  count_pessoas?: number;

  @IsNumber()
  @IsOptional()
  count_funcionarios?: number;
}
