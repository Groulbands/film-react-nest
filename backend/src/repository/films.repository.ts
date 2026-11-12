import { FilmDto, FilmEntity } from '../films/dto/films.dto';

export interface SeatReservation {
  film: string;
  session: string;
  row: number;
  seat: number;
}

export abstract class FilmsRepository {
  abstract findAll(): Promise<FilmDto[]>;
  abstract findById(id: string): Promise<FilmEntity | null>;
  abstract reserveSeats(seats: SeatReservation[]): Promise<void>;
}
