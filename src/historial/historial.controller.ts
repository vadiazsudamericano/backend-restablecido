import { Controller, Get, Post, Body, Request as Req, UseGuards } from '@nestjs/common';
import { HistorialService } from './historial.service';
import { CreateHistorialDto } from './dto/create-historial.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express'; // ✅ agrega esta línea

@Controller('historial')
@UseGuards(AuthGuard('jwt'))
export class HistorialController {
  constructor(private readonly historialService: HistorialService) {}

  @Post()
  create(@Req() req: Request, @Body() createHistorialDto: CreateHistorialDto) {
    const userId = (req.user as any).id; // 👈 usa cast para evitar error
    return this.historialService.create(createHistorialDto, userId);
  }

  @Get()
  findAll(@Req() req: Request) {
    const userId = (req.user as any).id;
    return this.historialService.findByUserId(userId);
  }
}
