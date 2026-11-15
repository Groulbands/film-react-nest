import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { Film } from './film.entity';

@Entity({ name: 'schedules' })
export class Schedule {
  @PrimaryColumn('uuid')
  id: string;

  @Index('idx_schedules_film_id')
  @Column({ name: 'film_id', type: 'uuid' })
  filmId: string;

  @ManyToOne(() => Film, (film) => film.schedule, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'film_id', referencedColumnName: 'id' })
  film: Film;

  @Column('text')
  daytime: string;

  @Column('integer')
  hall: number;

  @Column('integer')
  rows: number;

  @Column('integer')
  seats: number;

  @Column('integer')
  price: number;

  @Column('text', { array: true, default: () => "'{}'::text[]" })
  taken: string[];
}
