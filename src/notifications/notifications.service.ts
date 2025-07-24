import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Twilio } from 'twilio';

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);
  private twilioClient: Twilio;

  constructor(private configService: ConfigService) {
    const accountSid = this.configService.get<string>('TWILIO_ACCOUNT_SID');
    const authToken = this.configService.get<string>('TWILIO_AUTH_TOKEN');

    if (!accountSid || !authToken) {
      this.logger.error('Faltan las credenciales de Twilio en las variables de entorno. Asegúrate de que TWILIO_ACCOUNT_SID y TWILIO_AUTH_TOKEN estén definidas.');
      throw new Error('Las credenciales de Twilio no están configuradas.');
    }

    this.twilioClient = new Twilio(accountSid, authToken);
    this.logger.log('Cliente de Twilio inicializado correctamente.');
  }

  /**
   * Envía una notificación de escaneo usando una PLANTILLA DE WHATSAPP.
   * @param nombreHerramienta El nombre de la herramienta que fue escaneada.
   * @returns `true` si el mensaje se envió con éxito, `false` en caso contrario.
   */
  async sendScanNotification(nombreHerramienta: string): Promise<boolean> {
    // --- LÓGICA MODIFICADA PARA USAR PLANTILLAS ---

    // 1. Obtenemos los datos desde las variables de entorno
    const from = this.configService.get<string>('TWILIO_WHATSAPP_NUMBER');
    const to = `whatsapp:${this.configService.get<string>('SUPERVISOR_WHATSAPP_NUMBER')}`;
    const contentSid = this.configService.get<string>('TWILIO_CONTENT_SID');

    if (!from || !to.replace('whatsapp:', '') || !contentSid) {
      this.logger.error('Faltan datos para enviar la plantilla de WhatsApp (número de origen, destino o Content SID).');
      return false;
    }

    // 2. Creamos las variables dinámicas para la plantilla
    // Asumimos que la variable {{1}} en tu plantilla es el nombre de la herramienta.
    // Asumimos que la variable {{2}} es la fecha/hora del escaneo.
    const now = new Date();
    const fecha = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`;
    const hora = now.toLocaleTimeString('es-EC', { hour: '2-digit', minute: '2-digit' });
    
    const contentVariables = JSON.stringify({
      '1': nombreHerramienta,
      '2': `${fecha} a las ${hora}`
    });

    // 3. Enviamos el mensaje usando la misma lógica que proporcionaste
    try {
      this.logger.log(`Intentando enviar plantilla ${contentSid} a ${to} con variables: ${contentVariables}`);

      const message = await this.twilioClient.messages.create({
        from: from,
        to: to,
        contentSid: contentSid,
        contentVariables: contentVariables,
      });

      this.logger.log(`Plantilla de notificación enviada con éxito al supervisor. SID: ${message.sid}`);
      return true;
    } catch (error) {
      this.logger.error('Error al enviar la plantilla de WhatsApp al supervisor', error);
      return false;
    }
  }
}