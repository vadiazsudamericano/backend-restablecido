import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/user.entity';
import { Herramienta } from '../../herramienta/herramienta.entity';

@Entity()
export class Historial {
  @PrimaryGeneratedColumn()
  id!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @Column()
  herramientaId!: number;

  @ManyToOne(() => Herramienta)
  @JoinColumn({ name: 'herramientaId' })
  herramienta!: Herramienta;

  @Column()
  userId!: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  usuario!: User;

  @Column({ nullable: true })
referenciaVisual!: string;

}
