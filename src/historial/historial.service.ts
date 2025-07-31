import { Injectable, InternalServerErrorException } from '@nestjs/common';
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

  async create(data: CreateHistorialDto, userId: number) {
    try {
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
  }

  async findByUserId(userId: number) {
  try {
    console.log('🔍 Buscando historial para userId:', userId);
    return await this.historialRepository.find({
      where: { userId },
      relations: ['herramienta', 'usuario'], // ✅ AÑADIDO
      order: { createdAt: 'DESC' },
    });
  } catch (error) {
    console.error('❌ Error en findByUserId:', error);
    throw new InternalServerErrorException('Error al obtener historial');
  }
}

}
