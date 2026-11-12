import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Schedule } from './schedule.entity';

@Entity({ name: 'films' })
export class Film {
  @PrimaryColumn('uuid')
  id: string;

  @Column('double precision')
  rating: number;

  @Column('text')
  director: string;

  @Column('text', { array: true, default: () => "'{}'::text[]" })
  tags: string[];

  @Column('text')
  title: string;

  @Column('text')
  about: string;

  @Column('text')
  description: string;

  @Column('text')
  image: string;

  @Column('text')
  cover: string;

  @OneToMany(() => Schedule, (schedule) => schedule.film)
  schedule: Schedule[];
}
