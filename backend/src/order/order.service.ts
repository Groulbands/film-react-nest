import { BadRequestException, Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { FilmsRepository, SeatReservation } from '../repository/films.repository';
import { CreateOrderDto, OrderedTicketDto, OrderResultDto, TicketDto } from './dto/order.dto';
import { FilmEntity, ScheduleDto } from '../films/dto/films.dto';

@Injectable()
export class OrderService {
  constructor(private readonly repository: FilmsRepository) {}

  async createOrder(order: CreateOrderDto): Promise<OrderResultDto> {
    if (!order || typeof order.email !== 'string'
      || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(order.email)
      || typeof order.phone !== 'string' || !order.phone.trim()
      || !Array.isArray(order.tickets) || order.tickets.length === 0) {
      throw new BadRequestException('Некорректные контактные данные или пустой заказ');
    }

    const films = new Map<string, FilmEntity>();
    const tickets: OrderedTicketDto[] = [];
    const reservations: SeatReservation[] = [];
    const uniqueSeats = new Set<string>();

    for (const ticket of order.tickets) {
      if (!this.isTicket(ticket)) throw new BadRequestException('Некорректные данные билета');

      let film = films.get(ticket.film);
      if (!film) {
        film = await this.repository.findById(ticket.film);
        if (!film) throw new BadRequestException('Фильм не найден');
        films.set(ticket.film, film);
      }

      const session: ScheduleDto = film.schedule?.find((item) => item.id === ticket.session);
      if (!session) throw new BadRequestException('Сеанс не найден');
      if (ticket.row > session.rows || ticket.seat > session.seats) {
        throw new BadRequestException('Место находится за пределами зала');
      }

      const seatKey = `${ticket.row}:${ticket.seat}`;
      const reservationKey = `${ticket.film}:${ticket.session}:${seatKey}`;
      if (uniqueSeats.has(reservationKey) || (session.taken ?? []).includes(seatKey)) {
        throw new BadRequestException('Указанное место уже занято');
      }
      uniqueSeats.add(reservationKey);

      tickets.push({
        id: randomUUID(),
        film: ticket.film,
        session: ticket.session,
        daytime: session.daytime,
        row: ticket.row,
        seat: ticket.seat,
        price: session.price,
      });
      reservations.push({ film: ticket.film, session: ticket.session, row: ticket.row, seat: ticket.seat });
    }

    await this.repository.reserveSeats(reservations);
    return { total: tickets.length, items: tickets };
  }

  private isTicket(value: TicketDto): value is TicketDto {
    return !!value && typeof value.film === 'string' && !!value.film
      && typeof value.session === 'string' && !!value.session
      && Number.isInteger(value.row) && value.row >= 1
      && Number.isInteger(value.seat) && value.seat >= 1;
  }
}
