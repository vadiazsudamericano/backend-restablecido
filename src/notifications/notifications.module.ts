import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { ConfigModule } from '@nestjs/config'; // ConfigModule es necesario para el servicio

@Module({
  imports: [ConfigModule], // Importamos ConfigModule para que el servicio pueda usar ConfigService
  controllers: [NotificationsController],
  providers: [NotificationsService],
})
export class NotificationsModule {}