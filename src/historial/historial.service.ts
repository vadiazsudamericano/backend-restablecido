// RUTA: src/historial/historial.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Historial } from './entities/historial.entity';
import { Herramienta } from '../herramienta/herramienta.entity';

@Injectable()
export class HistorialService {
  constructor(
    @InjectRepository(Historial)
    private historialRepository: Repository<Historial>,
    @InjectRepository(Herramienta)
    private herramientaRepository: Repository<Herramienta>,
  ) {}

  async create(registroDto: { herramientaId: number; estadoAlEscanear: string }): Promise<Historial> {
    const { herramientaId, estadoAlEscanear } = registroDto;

    const herramienta = await this.herramientaRepository.findOneBy({ id: herramientaId });
    if (!herramienta) {
      throw new NotFoundException(`No se encontró la herramienta con ID ${herramientaId}`);
    }

    const nuevoRegistro = this.historialRepository.create({
      herramienta: herramienta,
      estadoAlEscanear: estadoAlEscanear,
    });

    return this.historialRepository.save(nuevoRegistro);
  }

  // --- ¡ESTA ES LA FUNCIÓN MODIFICADA! ---
  // Añadimos la opción 'relations' para que TypeORM cargue la información
  // de la herramienta asociada a cada registro del historial.
  findAll(): Promise<Historial[]> {
    return this.historialRepository.find({
      order: {
        fechaEscaneo: 'DESC', // Ordenamos del más nuevo al más viejo
      },
      relations: ['herramienta'], // ¡Esta es la línea clave!
    });
  }
}