// RUTA: src/auth/strategies/jwt.strategy.ts

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
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET')
    });
  }

  async validate(payload: any) {
    const user = await this.usersService.findById(payload.sub); // ✅ usamos "sub"

    if (!user) {
      throw new UnauthorizedException('Token inválido o usuario no encontrado.');
    }

    return {
      id: user.id,
      email: user.email,
      role: user.role,
      nombre: user.nombre,
      apellido: user.apellido,
    };
  }
}
