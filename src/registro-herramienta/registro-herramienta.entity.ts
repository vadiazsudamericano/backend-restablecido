import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Herramienta } from '../herramienta/herramienta.entity';

@Entity()
export class RegistroHerramienta {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  fecha!: string;

  @Column()
  estadoAlEscanear!: string;

  @Column({ nullable: true })
  observaciones?: string;

  @ManyToOne(() => Herramienta, (herramienta) => herramienta.registros)
  herramienta!: Herramienta;
}
