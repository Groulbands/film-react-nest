import { Controller, Get, Param } from '@nestjs/common';
import { FilmsService } from './films.service';
import { FilmsListDto, ScheduleListDto } from './dto/films.dto';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get()
  getAll(): Promise<FilmsListDto> {
    return this.filmsService.getFilms();
  }

  @Get(':id/schedule')
  getSchedule(@Param('id') id: string): Promise<ScheduleListDto> {
    return this.filmsService.getSchedule(id);
  }
}
