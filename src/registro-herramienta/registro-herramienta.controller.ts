import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { RegistroHerramientaService } from './registro-herramienta.service';
import { RegistroHerramienta } from './registro-herramienta.entity';

@Controller('registro-herramientas')
export class RegistroHerramientaController {
  constructor(private readonly servicio: RegistroHerramientaService) {}

  @Post()
  create(@Body() data: any) {
    return this.servicio.create(data);
  }

  @Get()
  findAll(): Promise<RegistroHerramienta[]> {
    return this.servicio.findAll();
  }


  @Get('herramienta/:id')
  findByHerramienta(@Param('id') id: number) {
    return this.servicio.findByHerramienta(id);
  }
}
