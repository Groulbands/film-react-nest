import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/order.dto';

describe('OrderController', () => {
  let controller: OrderController;
  const orderService = { createOrder: jest.fn() };

  beforeEach(async () => {
    jest.resetAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [{ provide: OrderService, useValue: orderService }],
    }).compile();
    controller = module.get(OrderController);
  });

  const payload: CreateOrderDto = {
    email: 'test@example.com',
    phone: '+79999999999',
    tickets: [{ film: 'film-1', session: 'session-1', row: 1, seat: 2 }],
  };

  it('passes order DTO to service and returns response unchanged', async () => {
    const response = {
      total: 1,
      items: [{ id: 'ticket-1', ...payload.tickets[0] }],
    };
    orderService.createOrder.mockResolvedValue(response);
    await expect(controller.create(payload)).resolves.toBe(response);
    expect(orderService.createOrder).toHaveBeenCalledWith(payload);
    expect(orderService.createOrder).toHaveBeenCalledTimes(1);
  });

  it('propagates reservation errors', async () => {
    orderService.createOrder.mockRejectedValue(
      new BadRequestException('Место занято'),
    );
    await expect(controller.create(payload)).rejects.toBeInstanceOf(
      BadRequestException,
    );
  });
});
