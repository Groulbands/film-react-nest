import { Module } from '@nestjs/common';
import { RepositoryModule } from '../repository/repository.module';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

@Module({
  imports: [RepositoryModule],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
