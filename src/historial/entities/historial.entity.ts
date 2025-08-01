// RUTA: src/historial/entities/historial.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/user.entity';

@Entity()
export class Historial {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'herramientaId' })
  herramientaId!: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha!: Date;

  @Column({ name: 'referencia_visual', type: 'varchar', length: 100, nullable: false })
referenciaVisual!: string;

  @ManyToOne(() => User, user => user.id, { eager: true })
  @JoinColumn({ name: 'userId' }) // <- ¡Muy importante!
  user!: User;
}
