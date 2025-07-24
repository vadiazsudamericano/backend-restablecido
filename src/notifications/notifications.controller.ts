import { Controller, Post, Body, UseGuards, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport'; // Asumo que usas el AuthGuard de Passport/JWT
import { NotificationsService } from './notifications.service';

// DTO para validar el cuerpo de la petición
class NotificacionEscaneoDto {
  nombreHerramienta: string;
}

@Controller('notifications') // El endpoint base será /notifications
export class NotificationsController {
  private readonly logger = new Logger(NotificationsController.name);

  constructor(private readonly notificationsService: NotificationsService) {}

  @UseGuards(AuthGuard('jwt')) // ¡PROTEGEMOS LA RUTA!
  @Post('scan') // El endpoint completo será POST /notifications/scan
  async notificarEscaneo(@Body() data: NotificacionEscaneoDto) {
    this.logger.log(`Recibida petición para notificar escaneo de: ${data.nombreHerramienta}`);
    
    const success = await this.notificationsService.sendScanNotification(data.nombreHerramienta);

    if (success) {
      return { message: 'Notificación enviada correctamente.' };
    } else {
      throw new HttpException('No se pudo enviar la notificación', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}