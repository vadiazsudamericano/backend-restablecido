// RUTA: src/herramienta/herramienta.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
// Importamos la entidad con la que se va a relacionar
import { RegistroHerramienta } from '../registro-herramienta/registro-herramienta.entity';

@Entity('herramienta')
export class Herramienta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, name: 'nombre' })
  nombre: string;

  @Column({ name: 'descripcion' })
  descripcion: string;

  @Column({ nullable: true, name: 'uso' })
  uso: string;
  
  @Column({ nullable: true, name: 'estado' })
  estado: string;

  @Column({ type: 'text', array: true, nullable: true, name: 'proceso' })
  proceso: string[];



  // --- ¡ESTA ES LA PROPIEDAD QUE DEBE EXISTIR! ---
  // @OneToMany define la relación inversa: Una Herramienta puede tener Muchos Registros.
  // (registro) => registro.herramienta le dice a TypeORM que la propiedad de conexión
  // en la otra tabla se llama 'herramienta'.
  @OneToMany(() => RegistroHerramienta, (registro) => registro.herramienta)
  registros: RegistroHerramienta[];
}