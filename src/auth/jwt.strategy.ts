import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../users/users.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService
  ) {
    console.log('--- JwtStrategy inicializada ---');
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET')

    });
  }

  async validate(payload: any) {
    console.log('--- [JwtStrategy] Iniciando validación del payload ---');
    console.log('Payload recibido del token:', payload);

    const user = await this.usersService.findById(payload.sub);
    console.log('Usuario encontrado en la base de datos:', user);

    if (!user) {
      console.error('--- [JwtStrategy] ERROR: Usuario no encontrado en la DB. ---');
      throw new UnauthorizedException('Token inválido o usuario no existe.');
    }

    // ✅ Devolver solo los campos necesarios para el contexto
    return {
      id: user.id, // Necesario para extraer el userId
      email: user.email,
      role: user.role,
      nombre: user.nombre,
      apellido: user.apellido,
    };
  }
}
