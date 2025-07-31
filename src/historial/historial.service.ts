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
      // ✅ Log para verificar datos recibidos
      console.log('✅ [HistorialService.create] Datos recibidos:', data);
      console.log('🧍‍♂️ userId recibido:', userId);

      const historial = this.historialRepository.create({
        herramientaId: data.herramientaId,
        userId,
        accion: data.accion,
        referenciaVisual: data.referenciaVisual,
      });

      // ✅ Verifica el objeto antes de guardar
      console.log('📦 Objeto a guardar:', historial);

      const resultado = await this.historialRepository.save(historial);

      // ✅ Confirmación de guardado
      console.log('✅ Historial guardado exitosamente:', resultado);

      return resultado;
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
        relations: ['herramienta', 'usuario'], // Asegúrate que estas relaciones existan
        order: { createdAt: 'DESC' },
      });
    } catch (error) {
      console.error('❌ Error en findByUserId:', error);
      throw new InternalServerErrorException('Error al obtener historial');
    }
  }
}
