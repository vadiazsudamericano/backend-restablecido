// RUTA: src/herramienta/herramienta.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Herramienta } from './herramienta.entity';

@Injectable()
export class HerramientaService {
  constructor(
    @InjectRepository(Herramienta)
    private repo: Repository<Herramienta>
  ) {}

  findAll(): Promise<Herramienta[]> {
    return this.repo.find();
  }

  async findById(id: number): Promise<Herramienta> {
    const herramienta = await this.repo.findOne({ where: { id } });
    if (!herramienta) {
      throw new NotFoundException(`Herramienta con ID ${id} no encontrada`);
    }
    return herramienta;
  }

  async findByNombre(nombre: string): Promise<any> {
    const herramienta = await this.repo.findOne({
      where: { nombre },
      relations: ['registros'],
    });

    if (!herramienta) {
      throw new NotFoundException(`Herramienta con nombre '${nombre}' no encontrada`);
    }

    const estado = herramienta.registros?.[0]?.estado || 'Desconocido';

    return {
      id: herramienta.id,
      nombre: herramienta.nombre,
      descripcion: herramienta.descripcion,
      uso: herramienta.uso,
      proceso: herramienta.proceso,
      estado: estado,
      esterilizacion: herramienta.esterilizacion,
    };
  }

  create(data: Partial<Herramienta>): Promise<Herramienta> {
    const nueva = this.repo.create(data);
    return this.repo.save(nueva);
  }
}
