// RUTA: src/historial/historial.controller.ts

import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { HistorialService } from './historial.service';
import { CreateHistorialDto } from './dto/create-historial.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('historial')
@UseGuards(AuthGuard('jwt')) // Protegemos todo el controlador
export class HistorialController {
  constructor(private readonly historialService: HistorialService) {}

  // --- ¡ASEGÚRATE DE TENER ESTA RUTA! ---
  @Post()
  create(@Body() createHistorialDto: CreateHistorialDto) {
    return this.historialService.create(createHistorialDto);
  }

  @Get()
  findAll() {
    return this.historialService.findAll();
  }
}