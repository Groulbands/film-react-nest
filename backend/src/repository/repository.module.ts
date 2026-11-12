
import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AppConfigModule } from '../app.config.module';
import { AppConfig } from '../app.config.provider';
import { Film } from './entities/film.entity';
import { Schedule } from './entities/schedule.entity';
import { FilmsRepository } from './films.repository';
import { TypeormFilmsRepository } from './typeorm-films.repository';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [AppConfigModule],
      inject: ['CONFIG'],
      useFactory: (config: AppConfig): TypeOrmModuleOptions => {
        const dbUrl = new URL(config.database.url);

        return {
          type: 'postgres',
          host: dbUrl.hostname,
          port: Number(dbUrl.port || 5432),
          database: decodeURIComponent(dbUrl.pathname.slice(1)),
          username: config.database.username,
          password: config.database.password,
          entities: [Film, Schedule],
          synchronize: false,
        };
      },
    }),
    TypeOrmModule.forFeature([Film, Schedule]),
  ],
  providers: [
    TypeormFilmsRepository,
    { provide: FilmsRepository, useExisting: TypeormFilmsRepository },
  ],
  exports: [FilmsRepository],
})
export class RepositoryModule {}
