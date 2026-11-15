import { NestFactory } from '@nestjs/core';
import { config as loadEnv } from 'dotenv';
import { AppModule } from './app.module';
import { AppConfig } from './app.config.provider';
import { ApiErrorFilter } from './common/api-error.filter';
import { createLogger } from './logger/logger.factory';

async function bootstrap(): Promise<void> {
  loadEnv();
  const logger = createLogger(process.env.LOGGER_FORMAT ?? 'dev');
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.useLogger(logger);
  const { port } = app.get<AppConfig>('CONFIG');
  app.setGlobalPrefix('api/afisha');
  app.enableCors();
  app.useGlobalFilters(new ApiErrorFilter());
  await app.listen(port, '0.0.0.0');
  logger.log(`Film API запущен на порту ${port}`, 'Bootstrap');
}

void bootstrap();
