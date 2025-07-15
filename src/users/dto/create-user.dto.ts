import { IsEmail, IsString, IsEnum } from 'class-validator';

// Enum para los roles (puedes ajustarlo según tus necesidades)
export enum Role {
  ADMIN = 'admin',
  USER = 'user',
}

export class CreateUserDto {
  @IsEmail()
  email: string; // El correo electrónico del usuario

  @IsString()
  password: string; // La contraseña del usuario

  @IsEnum(Role)
  role: Role; // El rol del usuario, puede ser admin o user
}
