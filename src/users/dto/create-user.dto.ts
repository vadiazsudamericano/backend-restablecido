// RUTA: src/users/dto/create-user.dto.ts
import { Role } from '../../auth/enums/role.enum';

export class CreateUserDto {
  nombre!: string;
  apellido!: string;
  email!: string;
  password!: string;
  role?: Role;
}
