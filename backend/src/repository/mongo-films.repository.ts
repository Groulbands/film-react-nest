import {
  BadRequestException,
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import mongoose, { Connection, Model, Schema } from 'mongoose';
import { FilmDto, FilmEntity } from '../films/dto/films.dto';
import { toFilmDto } from './film.mapper';
import { FilmsRepository, SeatReservation } from './films.repository';

const sessionSchema = new Schema(
  {
    id: { type: String, required: true },
    daytime: { type: String, required: true },
    hall: { type: Schema.Types.Mixed, required: true },
    rows: { type: Number, required: true },
    seats: { type: Number, required: true },
    price: { type: Number, required: true },
    taken: { type: [String], default: [] },
  },
  { _id: false, id: false },
);

const filmSchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    rating: Number,
    director: String,
    tags: [String],
    title: String,
    about: String,
    description: String,
    image: String,
    cover: String,
    schedule: { type: [sessionSchema], default: [] },
  },
  { versionKey: false, id: false },
);

interface ReservationGroup {
  film: string;
  session: string;
  seats: string[];
}

@Injectable()
export class MongoFilmsRepository
  extends FilmsRepository
  implements OnModuleInit, OnModuleDestroy
{
  private connection: Connection;
  private model: Model<FilmEntity>;

  constructor(private readonly url: string) {
    super();
  }

  async onModuleInit(): Promise<void> {
    this.connection = await mongoose
      .createConnection(this.url, {
        serverSelectionTimeoutMS: 10000,
      })
      .asPromise();
    this.model = this.connection.model<FilmEntity>('Film', filmSchema, 'films');
  }

  async onModuleDestroy(): Promise<void> {
    if (this.connection) await this.connection.close();
  }

  async findAll(): Promise<FilmDto[]> {
    const films = await this.model
      .find({}, { _id: 0, schedule: 0 })
      .lean()
      .exec();
    return (films as unknown as FilmEntity[]).map(toFilmDto);
  }

  async findById(id: string): Promise<FilmEntity | null> {
    const film = await this.model.findOne({ id }, { _id: 0 }).lean().exec();
    return film as unknown as FilmEntity | null;
  }

  async reserveSeats(tickets: SeatReservation[]): Promise<void> {
    const groups = new Map<string, ReservationGroup>();
    for (const ticket of tickets) {
      const key = `${ticket.film}:${ticket.session}`;
      if (!groups.has(key)) {
        groups.set(key, {
          film: ticket.film,
          session: ticket.session,
          seats: [],
        });
      }
      groups.get(key).seats.push(`${ticket.row}:${ticket.seat}`);
    }

    const reserved: ReservationGroup[] = [];
    try {
      for (const group of groups.values()) {
        const result = await this.model
          .updateOne(
            {
              id: group.film,
              schedule: {
                $elemMatch: { id: group.session, taken: { $nin: group.seats } },
              },
            },
            { $addToSet: { 'schedule.$.taken': { $each: group.seats } } },
          )
          .exec();
        if (result.modifiedCount !== 1) {
          throw new BadRequestException('Одно или несколько мест уже занято');
        }
        reserved.push(group);
      }
    } catch (error) {
      for (const group of reserved.reverse()) {
        await this.model
          .updateOne(
            { id: group.film, 'schedule.id': group.session },
            { $pullAll: { 'schedule.$.taken': group.seats } },
          )
          .exec();
      }
      throw error;
    }
  }
}
