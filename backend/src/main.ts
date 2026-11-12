import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfig } from './app.config.provider';
import { ApiErrorFilter } from './common/api-error.filter';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const { port } = app.get<AppConfig>('CONFIG');
  app.setGlobalPrefix('api/afisha');
  app.enableCors();
  app.useGlobalFilters(new ApiErrorFilter());
  await app.listen(port);
  console.log(`Film API запущен: http://localhost:${port}/api/afisha/films`);
}

void bootstrap();
