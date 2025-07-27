import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Photo } from '../gallery/photo.entity'; // Asegúrate de que la ruta sea correcta
import { Historial } from '../historial/entities/historial.entity'; // Importa la entidad Historial
import { Role } from '../auth/enums/role.enum';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nombre!: string;

  @Column()
  apellido!: string;

  @Column({ unique: true })
  email!: string;
  
   @Column({
    select: false // <-- AÑADE ESTA LÍNEA
  })
  password?: string;


  @Column({
    type: 'varchar',
    default: Role.User,
    name: 'rol' // <-- 2. Usa el Enum para el valor por defecto
  })
  role!: Role; 
  
}
