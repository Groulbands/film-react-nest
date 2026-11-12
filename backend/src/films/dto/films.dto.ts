export class FilmDto {
  id: string;
  rating: number;
  director: string;
  tags: string[];
  title: string;
  about: string;
  description: string;
  image: string;
  cover: string;
}

export class ScheduleDto {
  id: string;
  daytime: string;
  hall: number | string;
  rows: number;
  seats: number;
  price: number;
  taken: string[];
}

export class FilmEntity extends FilmDto {
  schedule: ScheduleDto[];
}

export class FilmsListDto {
  total: number;
  items: FilmDto[];
}

export class ScheduleListDto {
  total: number;
  items: ScheduleDto[];
}
