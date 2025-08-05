import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Herramienta } from './herramienta.entity';
import { HerramientaService } from './herramienta.service';

@Controller('herramientas')
export class HerramientaController {
  constructor(
    @InjectRepository(Herramienta)
    private readonly herramientaRepository: Repository<Herramienta>,
  ) {}

  @Get()
  async getAll() {
    return await this.herramientaRepository.find();
  }

  // ✅ Búsqueda flexible por nombre (insensible a mayúsculas y tildes si usas PostgreSQL)
  @Get('nombre/:nombre')
  async getPorNombre(@Param('nombre') nombre: string) {
    const herramienta = await this.herramientaRepository
      .createQueryBuilder('herramienta')
      .where('LOWER(herramienta.nombre) LIKE LOWER(:nombre)', { nombre: `%${decodeURIComponent(nombre)}%` })
      .getOne();

    if (!herramienta) {
      throw new NotFoundException(`No se encontró la herramienta con nombre: ${decodeURIComponent(nombre)}`);
    }

    return herramienta;
  }

  @Get(':id')
  async getPorId(@Param('id') id: number) {
    const herramienta = await this.herramientaRepository.findOne({ where: { id } });

    if (!herramienta) {
      throw new NotFoundException(`No se encontró la herramienta con ID: ${id}`);
    }

    return herramienta;
  }
}
