import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AtendimentoService } from './atendimento.service';
import { AtendimentoEntity } from './atendimento.entity';
import { AtendimentoDto } from './atendimento.dto';

@Controller('atendimentos')
export class AtendimentoController {
  constructor(private atendimentoService: AtendimentoService) { }

  @Get()
  findAll(): Promise<AtendimentoEntity[]> {
    return this.atendimentoService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.atendimentoService.findById(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.atendimentoService.remove(id);
  }

  @Post()
  create(@Body() dto: AtendimentoDto) {
    return this.atendimentoService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: AtendimentoDto) {
    return this.atendimentoService.update({ ...dto, id });
  }
}
