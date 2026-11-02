export class TicketDto {
  film: string;
  session: string;
  daytime?: string;
  row: number;
  seat: number;
  price?: number;
}

export class CreateOrderDto {
  email: string;
  phone: string;
  tickets: TicketDto[];
}

export class OrderedTicketDto {
  id: string;
  film: string;
  session: string;
  daytime: string;
  row: number;
  seat: number;
  price: number;
}

export class OrderResultDto {
  total: number;
  items: OrderedTicketDto[];
}
