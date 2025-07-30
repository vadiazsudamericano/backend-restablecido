import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Historial } from './entities/historial.entity';
import { CreateHistorialDto } from './dto/create-historial.dto';
import { InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class HistorialService {
  constructor(
    @InjectRepository(Historial)
    private historialRepository: Repository<Historial>,
  ) {}

  async create(data: CreateHistorialDto, userId: number) {
  const historial = this.historialRepository.create({
    herramientaId: data.herramientaId,
    userId,
    accion: data.accion,
    referenciaVisual: data.referenciaVisual,
  });
  return await this.historialRepository.save(historial);
} catch (error: any) {
  console.error('❌ Error al crear historial:', error);
  throw new InternalServerErrorException('Error al guardar historial');
}


  async findByUserId(userId: number) {
    return await this.historialRepository.find({
      where: { userId },
      relations: ['herramienta'],
      order: { createdAt: 'DESC' },
    });
  }
}
