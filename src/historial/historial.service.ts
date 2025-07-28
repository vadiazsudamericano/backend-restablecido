// RUTA: src/historial/historial.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegistroHerramienta } from '../registro-herramienta/registro-herramienta.entity';
import { CreateHistorialDto } from './dto/create-historial.dto';

@Injectable()
export class HistorialService {
  constructor(
    @InjectRepository(RegistroHerramienta)
    private readonly registroRepository: Repository<RegistroHerramienta>,
  ) {}

  create(createHistorialDto: CreateHistorialDto) {
    const nuevoRegistro = this.registroRepository.create(createHistorialDto);
    return this.registroRepository.save(nuevoRegistro);
  }

  // --- ¡ESTE ES EL MÉTODO CLAVE! ---
  findAll(): Promise<RegistroHerramienta[]> {
    return this.registroRepository.find({
      // Con 'relations', le decimos a TypeORM que también traiga el objeto 'herramienta' completo.
      relations: ['herramienta'],
      // Ordenamos los resultados para que los más recientes aparezcan primero.
      order: {
        fecha: 'DESC',
      },
    });
  }
}