import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { RegistroHerramienta } from '../registro-herramienta/registro-herramienta.entity'; // Verifica que la ruta esté correcta

@Entity()
export class Herramienta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  descripcion: string;

  @Column("text", { array: true }) // Proceso de desinfección en pasos
  proceso: string[];

  // Aquí agregamos la relación OneToMany con RegistroHerramienta
  @OneToMany(() => RegistroHerramienta, (registro) => registro.herramienta)
  registros: RegistroHerramienta[]; // Asegúrate de que esta propiedad esté bien definida
}
