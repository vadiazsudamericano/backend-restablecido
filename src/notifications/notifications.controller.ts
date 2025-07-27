import { Controller, Post, Get, Body, Logger, HttpException, HttpStatus } from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport'; // Comentado temporalmente
import { NotificationsService } from './notifications.service';

// DTO para validar el cuerpo de la petición
class NotificacionEscaneoDto {
  nombreHerramienta!: string;
}

@Controller('notifications') // El endpoint base será /notifications
export class NotificationsController {
  private readonly logger = new Logger(NotificationsController.name);

  constructor(private readonly notificationsService: NotificationsService) {}

  // Endpoint de health check para probar conectividad
  @Get('health')
  getHealth() {
    this.logger.log('Health check llamado');
    return { 
      status: 'OK', 
      timestamp: new Date().toISOString(),
      service: 'notifications' 
    };
  }

  // @UseGuards(AuthGuard('jwt')) // Comentado temporalmente para probar
  @Post('scan') // El endpoint completo será POST /notifications/scan
  async notificarEscaneo(@Body() data: NotificacionEscaneoDto) {
    try {
      this.logger.log(`Recibida petición para notificar escaneo de: ${data.nombreHerramienta}`);
      
      // Validación básica
      if (!data.nombreHerramienta || data.nombreHerramienta.trim() === '') {
        throw new HttpException('nombreHerramienta es requerido', HttpStatus.BAD_REQUEST);
      }
      
      const success = await this.notificationsService.sendScanNotification(data.nombreHerramienta);

      if (success) {
        this.logger.log('Notificación procesada exitosamente');
        return { 
          message: 'Notificación enviada correctamente.',
          timestamp: new Date().toISOString(),
          herramienta: data.nombreHerramienta
        };
      } else {
        throw new HttpException('No se pudo enviar la notificación', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    } catch (error) {
      this.logger.error('Error en notificarEscaneo:', error);
      
      // Si ya es una HttpException, la re-lanzamos
      if (error instanceof HttpException) {
        throw error;
      }
      
      // Si no, creamos una nueva
      throw new HttpException('Error interno del servidor', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}