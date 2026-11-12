import { BadRequestException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Film } from './entities/film.entity';
import { Schedule } from './entities/schedule.entity';
import { TypeormFilmsRepository } from './typeorm-films.repository';

const filmId = '0e33c7f6-27a7-4aa0-8e61-65d7e5effecf';
const sessionId = 'f2e429b0-685d-41f8-a8cd-1d8cb63b99ce';
const otherSessionId = '5beec101-acbb-4158-adc6-d855716b44a8';

const makeFilm = () => ({
  id: filmId,
  rating: 9,
  director: 'Test',
  tags: ['Drama'],
  title: 'Film',
  about: 'About',
  description: 'Description',
  image: '/bg1s.jpg',
  cover: '/bg1c.jpg',
  schedule: [{ id: sessionId, daytime: '2024-06-28T10:00:53+03:00',
    hall: 0, rows: 5, seats: 10, price: 350, taken: [] }],
});

const makeSchedule = (id: string, taken: string[] = []): Schedule => ({
  id,
  filmId,
  film: undefined,
  daytime: '2024-06-28T10:00:53+03:00',
  hall: 0,
  rows: 5,
  seats: 10,
  price: 350,
  taken,
});

function mockDatabase(initial: Schedule[]) {
  const rows = new Map(initial.map((s) => [s.id, structuredClone(s)]));
  const locks = jest.fn();

  const transaction = jest.fn(async (callback: (manager: unknown) => Promise<void>) => {
    const pending = new Map([...rows].map(([id, s]) => [id, structuredClone(s)]));
    const repo = {
      createQueryBuilder: () => {
        let requested: string;
        let film: string;
        const query = {
          where: (_expr: string, args: { sessionId: string }) => {
            requested = args.sessionId;
            return query;
          },
          andWhere: (_expr: string, args: { filmId: string }) => {
            film = args.filmId;
            return query;
          },
          setLock: locks.mockImplementation(() => query),
          getOne: async () => {
            const s = pending.get(requested);
            return s && s.filmId === film ? structuredClone(s) : null;
          },
        };
        return query;
      },
      save: async (s: Schedule) => pending.set(s.id, structuredClone(s)),
    };
    await callback({ getRepository: () => repo });
    for (const [id, s] of pending) rows.set(id, s);
  });

  const filmRepo = {
    find: jest.fn().mockResolvedValue([makeFilm()]),
    findOne: jest.fn().mockResolvedValue(makeFilm()),
  } as unknown as Repository<Film>;
  const dataSource = { transaction } as unknown as DataSource;
  const repository = new TypeormFilmsRepository(filmRepo, dataSource);
  return { rows, transaction, locks, repository };
}

describe('TypeormFilmsRepository (mocked DB)', () => {
  it('preserves API DTO shape and joins schedule', async () => {
    const { repository } = mockDatabase([makeSchedule(sessionId)]);
    const films = await repository.findAll();
    expect(films).toHaveLength(1);
    expect(films[0]).not.toHaveProperty('schedule');
    const film = await repository.findById(filmId);
    expect(film.schedule).toHaveLength(1);
    expect(film.schedule[0].taken).toEqual([]);
    expect(await repository.findById('not-a-uuid')).toBeNull();
  });

  it('books a seat and requests a pessimistic row lock', async () => {
    const { rows, locks, repository } = mockDatabase([makeSchedule(sessionId)]);
    await repository.reserveSeats([
      { film: filmId, session: sessionId, row: 1, seat: 2 },
    ]);
    expect(rows.get(sessionId).taken).toEqual(['1:2']);
    expect(locks).toHaveBeenCalledWith('pessimistic_write');
  });

  it('rejects an already occupied seat without changing the database', async () => {
    const { rows, repository } = mockDatabase([makeSchedule(sessionId, ['1:2'])]);
    await expect(repository.reserveSeats([
      { film: filmId, session: sessionId, row: 1, seat: 2 },
    ])).rejects.toBeInstanceOf(BadRequestException);
    expect(rows.get(sessionId).taken).toEqual(['1:2']);
  });

  it('rolls back all sessions when one ticket cannot be booked', async () => {
    const { rows, repository } = mockDatabase([
      makeSchedule(sessionId), makeSchedule(otherSessionId, ['1:1']),
    ]);
    await expect(repository.reserveSeats([
      { film: filmId, session: sessionId, row: 1, seat: 2 },
      { film: filmId, session: otherSessionId, row: 1, seat: 1 },
    ])).rejects.toBeInstanceOf(BadRequestException);
    expect(rows.get(sessionId).taken).toEqual([]);
    expect(rows.get(otherSessionId).taken).toEqual(['1:1']);
  });

  it('rejects duplicates and out-of-range coordinates', async () => {
    const { repository } = mockDatabase([makeSchedule(sessionId)]);
    await expect(repository.reserveSeats([
      { film: filmId, session: sessionId, row: 6, seat: 1 },
    ])).rejects.toBeInstanceOf(BadRequestException);
    await expect(repository.reserveSeats([
      { film: filmId, session: sessionId, row: 1, seat: 1 },
      { film: filmId, session: sessionId, row: 1, seat: 1 },
    ])).rejects.toBeInstanceOf(BadRequestException);
  });
});
