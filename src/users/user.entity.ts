import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Photo } from '../gallery/photo.entity'; // Asegúrate de que la ruta sea correcta
import { Historial } from '../historial/entities/historial.entity'; // Importa la entidad Historial
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  apellido: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;
  
}
