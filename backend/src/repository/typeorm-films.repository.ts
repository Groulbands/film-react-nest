import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { FilmDto, FilmEntity } from '../films/dto/films.dto';
import { Film } from './entities/film.entity';
import { Schedule } from './entities/schedule.entity';
import { toFilmDto, toScheduleDto } from './film.mapper';
import { FilmsRepository, SeatReservation } from './films.repository';

interface ReservationGroup {
  film: string;
  session: string;
  seats: { row: number; seat: number; key: string }[];
}

@Injectable()
export class TypeormFilmsRepository extends FilmsRepository {
  constructor(
    @InjectRepository(Film)
    private readonly films: Repository<Film>,
    private readonly dataSource: DataSource,
  ) {
    super();
  }

  async findAll(): Promise<FilmDto[]> {
    const films = await this.films.find({ order: { title: 'ASC' } });
    return films.map(toFilmDto);
  }

  async findById(id: string): Promise<FilmEntity | null> {
    if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)) {
      return null;
    }
    const film = await this.films.findOne({
      where: { id },
      relations: { schedule: true },
    });
    if (!film) return null;

    const schedule = [...(film.schedule ?? [])]
      .sort((a, b) => a.daytime.localeCompare(b.daytime))
      .map(toScheduleDto);

    return { ...toFilmDto(film), schedule };
  }

  async reserveSeats(tickets: SeatReservation[]): Promise<void> {
    if (!tickets.length) {
      throw new BadRequestException('Нельзя забронировать пустой заказ');
    }

    const groups = new Map<string, ReservationGroup>();
    for (const ticket of tickets) {
      const key = `${ticket.film}:${ticket.session}`;
      if (!groups.has(key)) {
        groups.set(key, { film: ticket.film, session: ticket.session, seats: [] });
      }
      groups.get(key).seats.push({
        row: ticket.row,
        seat: ticket.seat,
        key: `${ticket.row}:${ticket.seat}`,
      });
    }

    const orderedGroups = [...groups.values()].sort((a, b) =>
      `${a.film}:${a.session}`.localeCompare(`${b.film}:${b.session}`),
    );

    await this.dataSource.transaction(async (manager) => {
      const schedules = manager.getRepository(Schedule);

      for (const group of orderedGroups) {
        const schedule = await schedules
          .createQueryBuilder('schedule')
          .where('schedule.id = :sessionId', { sessionId: group.session })
          .andWhere('schedule.filmId = :filmId', { filmId: group.film })
          .setLock('pessimistic_write')
          .getOne();

        if (!schedule) {
          throw new BadRequestException('Фильм или сеанс не найден');
        }

        const occupied = new Set(schedule.taken ?? []);
        for (const ticket of group.seats) {
          if (
            !Number.isInteger(ticket.row) ||
            !Number.isInteger(ticket.seat) ||
            ticket.row < 1 ||
            ticket.seat < 1 ||
            ticket.row > schedule.rows ||
            ticket.seat > schedule.seats ||
            occupied.has(ticket.key)
          ) {
            throw new BadRequestException('Место недоступно или уже занято');
          }
          occupied.add(ticket.key);
        }

        schedule.taken = [...occupied];
        await schedules.save(schedule);
      }
    });
  }
}
