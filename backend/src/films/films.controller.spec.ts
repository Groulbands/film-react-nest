import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';

describe('FilmsController', () => {
  let controller: FilmsController;
  const filmsService = { getFilms: jest.fn(), getSchedule: jest.fn() };

  beforeEach(async () => {
    jest.resetAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [{ provide: FilmsService, useValue: filmsService }],
    }).compile();
    controller = module.get(FilmsController);
  });

  it('returns list provided by service', async () => {
    const response = { total: 1, items: [{ id: 'film-1', title: 'Film' }] };
    filmsService.getFilms.mockResolvedValue(response);
    await expect(controller.getAll()).resolves.toBe(response);
    expect(filmsService.getFilms).toHaveBeenCalledTimes(1);
  });

  it('passes id and returns schedule response', async () => {
    const response = { total: 0, items: [] };
    filmsService.getSchedule.mockResolvedValue(response);
    await expect(controller.getSchedule('film-1')).resolves.toBe(response);
    expect(filmsService.getSchedule).toHaveBeenCalledWith('film-1');
  });

  it('propagates service exceptions', async () => {
    filmsService.getSchedule.mockRejectedValue(new NotFoundException('Фильм не найден'));
    await expect(controller.getSchedule('missing')).rejects.toBeInstanceOf(NotFoundException);
  });
});
