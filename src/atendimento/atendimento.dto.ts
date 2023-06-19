import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDateString,
  IsNumber,
  IsOptional,
  IsUUID,
  ValidateNested
} from 'class-validator';
import { AnimalDto } from 'src/animal/animal.dto';
import { FuncionarioDto } from 'src/funcionario/funcionario.dto';

export class AtendimentoDto {
  @IsUUID()
  @IsOptional()
  id?: string;

  @Type(() => FuncionarioDto)
  @ValidateNested()
  funcionario: FuncionarioDto;

  @Type(() => AnimalDto)
  @ValidateNested()
  animal: AnimalDto;

  @IsDateString()
  data?: Date | string;

  @IsNumber()
  valor: number;

  @IsBoolean()
  pago: boolean;

}
