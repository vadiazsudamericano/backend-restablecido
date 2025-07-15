import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';  // Asegúrate de que la ruta sea correcta
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    forwardRef(() => UsersModule),  // Utilizamos forwardRef aquí
    PassportModule,
    JwtModule.register({ secret: 'secretKey', signOptions: { expiresIn: '1h' } }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService, JwtModule],  // Exportamos AuthService si lo necesitamos en otros módulos
})
export class AuthModule {}
