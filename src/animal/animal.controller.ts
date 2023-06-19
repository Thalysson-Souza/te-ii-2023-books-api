import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AnimalService } from './animal.service';
import { AnimalEntity } from './animal.entity';
import { AnimalDto } from './animal.dto';

@Controller('pessoas')
export class AnimalController {
  constructor(private animalService: AnimalService) { }

  @Get()
  findAll(): Promise<AnimalEntity[]> {
    return this.animalService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.animalService.findById(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.animalService.remove(id);
  }

  @Post()
  create(@Body() dto: AnimalDto) {
    return this.animalService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: AnimalDto) {
    return this.animalService.update({ ...dto, id });
  }
}
