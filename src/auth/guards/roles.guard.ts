// RUTA: src/auth/guards/roles.guard.ts

import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorator/roles.decorator';
import { Role } from '../enums/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Obtiene los roles requeridos para la ruta (ej. 'admin')
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // Si la ruta no está marcada con ningún rol, permite el acceso
    if (!requiredRoles) {
      return true;
    }

    // Obtiene el usuario de la petición (inyectado por el AuthGuard de JWT)
    const { user } = context.switchToHttp().getRequest();

    // Compara si alguno de los roles del usuario coincide con los roles requeridos
    return requiredRoles.some((role) => user.role?.includes(role));
  }
}