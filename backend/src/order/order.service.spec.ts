import { BadRequestException } from '@nestjs/common';
import { MemoryFilmsRepository } from '../repository/memory-films.repository';
import { FilmEntity } from '../films/dto/films.dto';
import { OrderService } from './order.service';
import { FilmsService } from '../films/films.service';

const film: FilmEntity = {
  id: 'film-1',
  rating: 9,
  director: 'Режиссёр',
  tags: ['Драма'],
  title: 'Тестовый фильм',
  about: 'Описание',
  description: 'Подробное описание',
  image: '/bg1s.jpg',
  cover: '/bg1c.jpg',
  schedule: [{
    id: 'session-1',
    daytime: '2026-12-01T12:00:00Z',
    hall: 1,
    rows: 5,
    seats: 10,
    price: 350,
    taken: [],
  }],
};

const ticket = { film: 'film-1', session: 'session-1', row: 1, seat: 1 };
const order = (tickets = [ticket]) => ({
  email: 'test@example.com',
  phone: '+79999999999',
  tickets,
});

describe('Film! business logic', () => {
  let repo: MemoryFilmsRepository;
  let orders: OrderService;
  let films: FilmsService;

  beforeEach(() => {
    repo = new MemoryFilmsRepository([film]);
    orders = new OrderService(repo);
    films = new FilmsService(repo);
  });

  it('returns films without schedule and a separate schedule response', async () => {
    expect(await films.getFilms()).toEqual({ total: 1, items: [expect.not.objectContaining({ schedule: expect.anything() })] });
    expect((await films.getSchedule('film-1')).total).toBe(1);
  });

  it('books a seat and updates taken', async () => {
    const result = await orders.createOrder(order());
    expect(result.total).toBe(1);
    expect(result.items[0]).toEqual(expect.objectContaining({
      id: expect.any(String), price: 350, film: 'film-1', session: 'session-1',
    }));
    expect((await films.getSchedule('film-1')).items[0].taken).toEqual(['1:1']);
  });

  it('rejects duplicate booking', async () => {
    await orders.createOrder(order());
    await expect(orders.createOrder(order())).rejects.toBeInstanceOf(BadRequestException);
  });

  it('rejects duplicates inside one order without booking anything', async () => {
    await expect(orders.createOrder(order([ticket, ticket]))).rejects.toBeInstanceOf(BadRequestException);
    expect((await films.getSchedule('film-1')).items[0].taken).toEqual([]);
  });

  it('rejects nonexisting film and session', async () => {
    await expect(orders.createOrder(order([{ ...ticket, film: 'invalid' }]))).rejects.toBeInstanceOf(BadRequestException);
    await expect(orders.createOrder(order([{ ...ticket, session: 'invalid' }]))).rejects.toBeInstanceOf(BadRequestException);
  });

  it('rejects a seat outside the hall and invalid row/seat', async () => {
    await expect(orders.createOrder(order([{ ...ticket, row: 6 }]))).rejects.toBeInstanceOf(BadRequestException);
    await expect(orders.createOrder(order([{ ...ticket, seat: 0 }]))).rejects.toBeInstanceOf(BadRequestException);
  });

  it('rejects empty bookings and invalid contact details', async () => {
    await expect(orders.createOrder(order([]))).rejects.toBeInstanceOf(BadRequestException);
    await expect(orders.createOrder({ ...order(), email: 'wrong' })).rejects.toBeInstanceOf(BadRequestException);
  });

  it('ignores client supplied price and rejects concurrent purchases of the same seat', async () => {
    const supplied = { ...ticket, price: 1, daytime: 'incorrect' };
    const outcomes = await Promise.allSettled([
      orders.createOrder(order([supplied])),
      orders.createOrder(order([supplied])),
    ]);
    expect(outcomes.filter((entry) => entry.status === 'fulfilled')).toHaveLength(1);
    const successful = outcomes.find((entry) => entry.status === 'fulfilled') as PromiseFulfilledResult<Awaited<ReturnType<OrderService['createOrder']>>>;
    expect(successful.value.items[0].price).toBe(350);
  });
});
