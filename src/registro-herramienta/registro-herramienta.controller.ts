import { Controller, Post, Body, Get } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegistroHerramienta } from './registro-herramienta.entity';
import { Herramienta } from '../herramienta/herramienta.entity';

@Controller('registros-herramienta')
export class RegistroHerramientaController {
  constructor(
    @InjectRepository(RegistroHerramienta)
    private registroRepo: Repository<RegistroHerramienta>,

    @InjectRepository(Herramienta)
    private herramientaRepo: Repository<Herramienta>,
  ) {}

  @Post()
  async crearRegistro(
    @Body()
    data: {
      herramientaId: number;
      fecha: string;
      observaciones: string;
    },
  ) {
    const herramienta = await this.herramientaRepo.findOne({
      where: { id: data.herramientaId },
    });

    if (!herramienta) {
      throw new Error('Herramienta no encontrada');
    }

    const registro = this.registroRepo.create({
      fecha: data.fecha,
      observaciones: data.observaciones,
      herramienta: herramienta,
    });

    return this.registroRepo.save(registro);
  }

  @Get()
  async obtenerRegistros() {
    return this.registroRepo.find({
      relations: ['herramienta'],
    });
  }
  
}
