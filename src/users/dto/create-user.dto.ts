import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  nombre: string;

  @IsNotEmpty()
  apellido: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
