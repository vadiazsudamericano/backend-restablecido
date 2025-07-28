import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { HistorialService } from './historial.service';
import { CreateHistorialDto } from './dto/create-historial.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('historial')
export class HistorialController {
  constructor(private readonly historialService: HistorialService) {}

  // 🔐 Ruta protegida con JWT para registrar escaneos
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() createHistorialDto: CreateHistorialDto) {
    return this.historialService.create(createHistorialDto);
  }

  // 🔐 Ruta protegida para obtener historial
  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll() {
    return this.historialService.findAll();
  }
}
