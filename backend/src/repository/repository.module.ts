import { Module } from '@nestjs/common';
import { AppConfig } from '../app.config.provider';
import { FilmsRepository } from './films.repository';
import { MemoryFilmsRepository } from './memory-films.repository';
import { MongoFilmsRepository } from './mongo-films.repository';

@Module({
  providers: [{
    provide: FilmsRepository,
    inject: ['CONFIG'],
    useFactory: (config: AppConfig): FilmsRepository => (
      config.database.driver === 'memory'
        ? new MemoryFilmsRepository()
        : new MongoFilmsRepository(config.database.url)
    ),
  }],
  exports: [FilmsRepository],
})
export class RepositoryModule {}
