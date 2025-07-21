import { Controller, Get, Post, Body } from '@nestjs/common';
import { HistorialService } from './historial.service';
import { Historial } from './entities/historial.entity';

@Controller('historial')
export class HistorialController {
  constructor(private readonly historialService: HistorialService) {}

  @Post()
  create(@Body() data: { herramientaId: number; estadoAlEscanear: string }): Promise<Historial> {
    return this.historialService.create(data);
  }

  @Get()
  findAll(): Promise<Historial[]> {
    return this.historialService.findAll();
  }
}