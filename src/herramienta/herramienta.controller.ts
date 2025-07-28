import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Herramienta } from './herramienta.entity';

@Controller('herramientas')
export class HerramientaController {
  constructor(
    @InjectRepository(Herramienta)
    private readonly herramientaRepository: Repository<Herramienta>,
  ) {}

  @Get()
  async getAll() {
    return this.herramientaRepository.find();
  }

  @Get('nombre/:nombre')
  async getPorNombre(@Param('nombre') nombre: string) {
    const herramienta = await this.herramientaRepository
      .createQueryBuilder('herramienta')
      .where('LOWER(herramienta.nombre) = LOWER(:nombre)', { nombre })
      .getOne();

    if (!herramienta) {
      throw new NotFoundException('Herramienta no encontrada');
    }

    return herramienta;
  }

  @Get(':id')
  async getPorId(@Param('id') id: number) {
    const herramienta = await this.herramientaRepository.findOne({ where: { id } });
    if (!herramienta) {
      throw new NotFoundException('Herramienta no encontrada');
    }
    return herramienta;
  }
}
