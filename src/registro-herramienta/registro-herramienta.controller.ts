// RUTA: src/registro-herramienta/registro-herramienta.controller.ts

import { Controller, Get, Post, Body } from '@nestjs/common';
import { RegistroHerramientaService } from './registro-herramienta.service';
import { RegistroHerramienta } from './registro-herramienta.entity';

@Controller('registros-herramienta') // Usamos ruta plural
export class RegistroHerramientaController {
  constructor(private readonly registroService: RegistroHerramientaService) {}

  @Post()
  create(@Body() createRegistroDto: { herramientaId: number; estado: string }): Promise<RegistroHerramienta> {
    return this.registroService.create(createRegistroDto);
  }

  @Get()
  findAll(): Promise<RegistroHerramienta[]> {
    return this.registroService.findAll(); // ✅ corregido el nombre del servicio
  }
}
