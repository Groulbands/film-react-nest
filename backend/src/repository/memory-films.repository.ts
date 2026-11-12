import { BadRequestException } from '@nestjs/common';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { FilmDto, FilmEntity } from '../films/dto/films.dto';
import { FilmsRepository, SeatReservation } from './films.repository';
import { toFilmDto } from './film.mapper';

export class MemoryFilmsRepository extends FilmsRepository {
  private readonly films: FilmEntity[];

  constructor(initialFilms?: FilmEntity[]) {
    super();
    this.films = structuredClone(
      initialFilms ??
        (JSON.parse(
          readFileSync(
            join(process.cwd(), 'test', 'films.fixture.json'),
            'utf8',
          ),
        ) as FilmEntity[]),
    );
  }

  async findAll(): Promise<FilmDto[]> {
    return this.films.map(toFilmDto);
  }

  async findById(id: string): Promise<FilmEntity | null> {
    const film = this.films.find((item) => item.id === id);
    return film ? structuredClone(film) : null;
  }

  async reserveSeats(tickets: SeatReservation[]): Promise<void> {
    const seen = new Set<string>();
    for (const ticket of tickets) {
      const key = `${ticket.film}:${ticket.session}:${ticket.row}:${ticket.seat}`;
      const film = this.films.find((item) => item.id === ticket.film);
      const session = film?.schedule.find((item) => item.id === ticket.session);
      if (
        !session ||
        seen.has(key) ||
        (session.taken ?? []).includes(`${ticket.row}:${ticket.seat}`)
      ) {
        throw new BadRequestException(
          'Указанное место уже занято или сеанс не найден',
        );
      }
      seen.add(key);
    }
    for (const ticket of tickets) {
      const session = this.films
        .find((item) => item.id === ticket.film)
        .schedule.find((item) => item.id === ticket.session);
      session.taken ??= [];
      session.taken.push(`${ticket.row}:${ticket.seat}`);
    }
  }
}
