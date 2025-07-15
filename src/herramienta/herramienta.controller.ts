import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { HerramientaService } from './herramienta.service';
import { Herramienta } from './herramienta.entity';

@Controller('herramientas')
export class HerramientaController {
  constructor(private readonly herramientaService: HerramientaService) {}

  @Get()
  findAll(): Promise<Herramienta[]> {
    return this.herramientaService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string): Promise<Herramienta> {
    return this.herramientaService.findById(+id);
  }

  @Post()
  create(@Body() data: Partial<Herramienta>): Promise<Herramienta> {
    return this.herramientaService.create(data);
  }
}
