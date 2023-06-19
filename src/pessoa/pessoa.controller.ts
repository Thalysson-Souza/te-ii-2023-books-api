import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PessoaDto } from './pessoa.dto';
import { PessoaEntity } from './pessoa.entity';
import { PessoaService } from './pessoa.service';

@Controller('pessoas')
export class PessoaController {
  constructor(private pessoaService: PessoaService) { }

  @Get()
  findAll(): Promise<PessoaEntity[]> {
    return this.pessoaService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.pessoaService.findById(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.pessoaService.remove(id);
  }

  @Post()
  create(@Body() @Param() dto: PessoaDto) {
    return this.pessoaService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: PessoaDto) {
    return this.pessoaService.update({ ...dto, id });
  }
}
