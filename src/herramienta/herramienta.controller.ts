// RUTA: src/herramienta/herramienta.controller.ts

import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { HerramientaService } from './herramienta.service';
import { Herramienta } from './herramienta.entity';

@Controller('herramientas')
export class HerramientaController {
  constructor(private readonly herramientaService: HerramientaService) {}

  @Get()
  findAll(): Promise<Herramienta[]> {
    return this.herramientaService.findAll();
  }

  // Ruta para buscar por nombre, ej: /herramientas/nombre/Tijera
  @Get('nombre/:nombre')
  async findByNombre(@Param('nombre') nombre: string): Promise<Herramienta> {
    console.log(`[BACKEND LOG] Petición recibida en el controlador para buscar: "${nombre}"`);
    
    const herramienta = await this.herramientaService.findByNombre(nombre);
    
    // Si el servicio no encuentra la herramienta, lanzará un error 404
    if (!herramienta) {
      throw new NotFoundException(`Herramienta con nombre "${nombre}" no encontrada en la base de datos.`);
    }
    
    return herramienta;
  }

  // Ruta para buscar por ID, ej: /herramientas/1
  @Get(':id')
  findById(@Param('id') id: string): Promise<Herramienta> {
    return this.herramientaService.findById(Number(id));
  }
}