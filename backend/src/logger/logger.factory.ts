import { LoggerService } from '@nestjs/common';
import { DevLogger } from './dev.logger';
import { JsonLogger } from './json.logger';
import { TskvLogger } from './tskv.logger';

export type LoggerFormat = 'dev' | 'json' | 'tskv';

export function createLogger(format: string = 'dev'): LoggerService {
  switch (format.toLowerCase()) {
    case 'dev':
      return new DevLogger();
    case 'json':
      return new JsonLogger();
    case 'tskv':
      return new TskvLogger();
    default:
      throw new Error(
        `Неизвестный LOGGER_FORMAT: ${format}. Используйте dev, json или tskv.`,
      );
  }
}
