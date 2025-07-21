// RUTA: src/registro-herramienta/registro-herramienta.controller.ts

import { Controller, Get, Post, Body } from '@nestjs/common';
import { RegistroHerramientaService } from './registro-herramienta.service';
import { RegistroHerramienta } from './registro-herramienta.entity';

// Es buena práctica nombrar las rutas en plural y en minúsculas.
@Controller('registros-herramienta')
export class RegistroHerramientaController {
  constructor(private readonly registroService: RegistroHerramientaService) {}

  // Ruta para crear un nuevo registro: POST /registros-herramienta
  @Post()
  create(@Body() createRegistroDto: { herramientaId: number; estado: string }): Promise<RegistroHerramienta> {
    return this.registroService.create(createRegistroDto);
  }

  // Ruta para obtener todos los registros: GET /registros-herramienta
  @Get()
  findAll(): Promise<RegistroHerramienta[]> {
    return this.registroService.findAll();
  }

  // La línea con @OneToMany ha sido eliminada porque no pertenece a este archivo.
}