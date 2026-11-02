import { Module } from '@nestjs/common';
import { RepositoryModule } from '../repository/repository.module';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';

@Module({
  imports: [RepositoryModule],
  controllers: [FilmsController],
  providers: [FilmsService],
  exports: [RepositoryModule],
})
export class FilmsModule {}
