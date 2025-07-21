// RUTA: src/registro-herramienta/registro-herramienta.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  JoinColumn
} from 'typeorm';
import { Herramienta } from '../herramienta/herramienta.entity'; // Importamos la entidad Herramienta para la relación

// Es una buena práctica usar "snake_case" para los nombres de las tablas.
@Entity('registro_herramienta')
export class RegistroHerramienta {

  @PrimaryGeneratedColumn()
  id: number;

  // --- RELACIÓN CON LA HERRAMIENTA ---
  // Define que muchos de estos registros pertenecen a UNA Herramienta.
  // La parte `(herramienta) => herramienta.registros` crea el vínculo con la propiedad
  // @OneToMany que acabamos de añadir en la entidad Herramienta.
  @ManyToOne(() => Herramienta, (herramienta) => herramienta.registros, {
    eager: true,      // Carga la herramienta asociada automáticamente al buscar un registro.
    onDelete: 'CASCADE' // Si se borra una herramienta, se borran sus registros.
  })
  // Le dice a TypeORM cómo se llamará la columna de la clave foránea en la base de datos.
  @JoinColumn({ name: 'herramienta_id' })
  herramienta: Herramienta;

  // --- COLUMNAS DE DATOS ---
  // El estado que tenía la herramienta en el momento de este registro.
  @Column({ name: 'estado_registrado' })
  estado: string;

  // Columna especial que TypeORM rellena con la fecha y hora de creación.
  @CreateDateColumn({ name: 'fecha_registro' })
  fecha: Date;
}