import { Injectable, Logger } from '@nestjs/common';
import { Twilio } from 'twilio';

// Definir interfaz para errores de Twilio
interface TwilioError {
  code?: string;
  moreInfo?: string;
  message: string;
}

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);
  private readonly twilioClient: Twilio;

  constructor() {
    // Configuración de Twilio
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;

    if (!accountSid || !authToken) {
      this.logger.error('TWILIO_ACCOUNT_SID y TWILIO_AUTH_TOKEN son requeridos');
      throw new Error('Configuración de Twilio faltante');
    }

    this.twilioClient = new Twilio(accountSid, authToken);
    this.logger.log('Twilio client inicializado correctamente');
  }

  async sendScanNotification(nombreHerramienta: string): Promise<boolean> {
    try {
      this.logger.log(`Iniciando envío de notificación para: ${nombreHerramienta}`);
      
      const message = `🔧 HERRAMIENTA ESCANEADA 🔧\n\nHerramienta: ${nombreHerramienta}\nFecha: ${new Date().toLocaleString('es-ES')}\nEstado: Verificada correctamente`;

      // Validar variables de entorno
      const fromNumber = process.env.TWILIO_PHONE_NUMBER;
      const toNumber = process.env.NOTIFICATION_PHONE_NUMBER;

      if (!fromNumber || !toNumber) {
        this.logger.error('TWILIO_PHONE_NUMBER y NOTIFICATION_PHONE_NUMBER son requeridos');
        return false;
      }

      // Configurar el mensaje de Twilio
      const messageOptions = {
        body: message,
        from: fromNumber,
        to: toNumber,
      };

      this.logger.log(`Enviando mensaje a ${messageOptions.to} desde ${messageOptions.from}`);
      
      // Enviar el mensaje
      const result = await this.twilioClient.messages.create(messageOptions);
      
      this.logger.log(`Mensaje enviado exitosamente. SID: ${result.sid}`);
      this.logger.log(`Estado del mensaje: ${result.status}`);
      
      return true;
    } catch (error) {
      this.logger.error('Error enviando notificación via Twilio:', error);
      
      // Verificar si es un error de Twilio
      const twilioError = error as TwilioError;
      if (twilioError.code) {
        this.logger.error(`Twilio Error Code: ${twilioError.code}`);
      }
      if (twilioError.moreInfo) {
        this.logger.error(`Más información: ${twilioError.moreInfo}`);
      }
      
      return false;
    }
  }

  // Método adicional para verificar la configuración de Twilio
  async verifyTwilioConnection(): Promise<boolean> {
    try {
      this.logger.log('Verificando conexión con Twilio...');
      
      const accountSid = process.env.TWILIO_ACCOUNT_SID;
      if (!accountSid) {
        this.logger.error('TWILIO_ACCOUNT_SID no está configurado');
        return false;
      }

      // Intentar obtener información de la cuenta
      const account = await this.twilioClient.api.accounts(accountSid).fetch();
      
      this.logger.log(`Conexión exitosa con Twilio. Cuenta: ${account.friendlyName}`);
      return true;
    } catch (error) {
      this.logger.error('Error verificando conexión con Twilio:', error);
      return false;
    }
  }
}