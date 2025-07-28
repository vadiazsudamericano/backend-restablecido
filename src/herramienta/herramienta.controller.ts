// src/herramienta/herramienta.controller.ts
import { Controller, Get, Param, NotFoundException, ParseIntPipe } from '@nestjs/common';
import { HerramientaService } from './herramienta.service';

@Controller('herramientas')
export class HerramientaController {
  constructor(private readonly herramientaService: HerramientaService) {}

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const herramienta = await this.herramientaService.findById(id);
    if (!herramienta) {
      throw new NotFoundException(`Herramienta con ID ${id} no encontrada`);
    }
    return herramienta;
  }
}
