// RUTA: src/herramienta/herramienta.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { RegistroHerramienta } from '../registro-herramienta/registro-herramienta.entity';

@Entity()
export class Herramienta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  nombre: string;

  @Column()
  descripcion: string;

  @Column({ nullable: true })
  uso: string;

  @Column("text", { array: true }) // Proceso de desinfección paso a paso
  proceso: string[];

  // ✅ Nueva propiedad agregada
  @Column({ nullable: true })
  esterilizacion: string;

  @OneToMany(() => RegistroHerramienta, (registro) => registro.herramienta)
  registros: RegistroHerramienta[];
}
