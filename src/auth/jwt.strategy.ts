// RUTA: src/auth/strategies/jwt.strategy.ts

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../users/users.service'; // <-- 1. Importa UsersService
import { ConfigService } from '@nestjs/config';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  // 2. Inyecta el UsersService en el constructor
  constructor(private readonly usersService: UsersService,
              private readonly configService: ConfigService
  ) {
    console.log('--- JwtStrategy inicializada ---');
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'secretKey', // <-- Asegúrate de que esta clave sea la correcta
    });
  }

  /**
   * Este método es llamado AUTOMÁTICAMENTE por el AuthGuard('jwt')
   * después de verificar la firma y la expiración del token.
   * Su trabajo es tomar el contenido (payload) del token y devolver
   * el objeto de usuario completo que se adjuntará a la petición (req.user).
   */
  async validate(payload: any) {
    // PRUEBA 1: Verificamos que estamos entrando aquí y vemos el contenido del token.
    console.log('--- [JwtStrategy] Iniciando validación del payload ---');
    console.log('Payload recibido del token:', payload);

    // PRUEBA 2: Buscamos al usuario en la base de datos usando el ID del token.
    // Esto asegura que el usuario no haya sido eliminado desde que se emitió el token.
    const user = await this.usersService.findById(payload.sub); // 'sub' es el ID del usuario
    console.log('Usuario encontrado en la base de datos:', user);

    // Si no se encuentra el usuario, el token es inválido.
    if (!user) {
      console.error('--- [JwtStrategy] ERROR: Usuario del token no encontrado en la DB. ---');
      throw new UnauthorizedException('Token inválido o usuario no existe.');
    }

    // PRUEBA 3: Devolvemos el usuario completo.
    // Este objeto será 'req.user' en nuestros controladores.
    // IMPORTANTE: TypeORM por defecto no devuelve la contraseña aquí, lo cual es perfecto.
    console.log('--- [JwtStrategy] Validación exitosa. Devolviendo usuario. ---');
    return user;
  }
}