import { Controller, Get, Post, Body } from '@nestjs/common';
import { TemperaturaService } from './temperatura.service';
import { CreateTemperaturaDto } from './dto/create-temperatura.dto';

@Controller('temperatura')
export class TemperaturaController {
  constructor(private readonly temperaturaService: TemperaturaService) {}

  @Post()
  create(@Body() createTemperaturaDto: CreateTemperaturaDto) {
    return this.temperaturaService.create(createTemperaturaDto);
  }

  @Get()
  findAll() {
    return this.temperaturaService.findAll();
  }
}