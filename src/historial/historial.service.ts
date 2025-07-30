import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Historial } from './entities/historial.entity';
import { CreateHistorialDto } from './dto/create-historial.dto';

@Injectable()
export class HistorialService {
  constructor(
    @InjectRepository(Historial)
    private historialRepository: Repository<Historial>,
  ) {}

  // Guardar historial con el userId autenticado
  async create(data: CreateHistorialDto, userId: number) {
    const historial = this.historialRepository.create({
      ...data,
      userId,
    });
    return await this.historialRepository.save(historial);
  }

  // Devolver historial solo del usuario autenticado
  async findByUserId(userId: number) {
    return await this.historialRepository.find({
      where: { userId },
      relations: ['herramienta'],
      order: { createdAt: 'DESC' },
    });
  }
}
