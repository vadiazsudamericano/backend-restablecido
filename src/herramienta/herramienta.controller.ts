// RUTA: src/herramienta/herramienta.controller.ts

import { Controller, Get, Param } from '@nestjs/common';
import { HerramientaService } from './herramienta.service';
import { Herramienta } from './herramienta.entity';

@Controller('herramientas')
export class HerramientaController {
  constructor(private readonly herramientaService: HerramientaService) {}

  @Get()
  findAll(): Promise<Herramienta[]> {
    return this.herramientaService.findAll();
  }
@Get('nombre/:nombre') // ← primero este
findByNombre(@Param('nombre') nombre: string) {
  return this.herramientaService.findByNombre(nombre);
}

@Get(':id')
findById(@Param('id') id: number): Promise<Herramienta> {
  return this.herramientaService.findById(id);
}  
}
