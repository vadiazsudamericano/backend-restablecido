import { IsOptional, IsString, Length, Matches } from 'class-validator';

export class CreateHistorialDto {
  herramientaId!: number;

  @IsOptional()
  @IsString({ message: 'La referencia visual debe ser una cadena de texto' })
  @Matches(/\S/, { message: 'La referencia visual no puede estar vacía o solo contener espacios' })
  @Length(1, 100, { message: 'La referencia visual debe tener entre 1 y 100 caracteres' })
  referencia_visual?: string;
}
