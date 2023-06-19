import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { FuncionarioEntity } from './funcionario.entity';
import { FuncionarioDto } from './funcionario.dto';

@Controller('funcionarios')
export class FuncionarioController {
  constructor(private funcionarioService: FuncionarioService) { }

  @Get()
  findAll(): Promise<FuncionarioEntity[]> {
    return this.funcionarioService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.funcionarioService.findById(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.funcionarioService.remove(id);
  }

  @Post()
  create(@Body() dto: FuncionarioDto) {
    return this.funcionarioService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: FuncionarioDto) {
    return this.funcionarioService.update({ ...dto, id });
  }
}
