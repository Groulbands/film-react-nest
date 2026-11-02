import { Injectable, NotFoundException } from '@nestjs/common';
import { FilmsRepository } from '../repository/films.repository';
import { FilmsListDto, ScheduleListDto } from './dto/films.dto';
import { toScheduleDto } from '../repository/film.mapper';

@Injectable()
export class FilmsService {
  constructor(private readonly repository: FilmsRepository) {}

  async getFilms(): Promise<FilmsListDto> {
    const items = await this.repository.findAll();
    return { total: items.length, items };
  }

  async getSchedule(id: string): Promise<ScheduleListDto> {
    const film = await this.repository.findById(id);
    if (!film) throw new NotFoundException('Фильм не найден');
    const items = (film.schedule ?? []).map(toScheduleDto);
    return { total: items.length, items };
  }
}
