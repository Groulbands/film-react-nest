import { ConfigService } from '@nestjs/config';

export interface AppConfigDatabase {
  driver: 'memory' | 'mongodb';
  url: string;
}

export interface AppConfig {
  port: number;
  database: AppConfigDatabase;
}

export const configProvider = {
  provide: 'CONFIG',
  inject: [ConfigService],
  useFactory: (config: ConfigService): AppConfig => {
    const driver = config.get<string>('DATABASE_DRIVER', 'mongodb');
    if (driver !== 'memory' && driver !== 'mongodb') {
      throw new Error('DATABASE_DRIVER должен быть mongodb или memory');
    }

    const port = Number(config.get<string>('PORT', '3000'));
    if (!Number.isInteger(port) || port < 1 || port > 65535) {
      throw new Error('PORT должен быть корректным номером порта');
    }

    return {
      port,
      database: {
        driver,
        url: config.get<string>(
          'DATABASE_URL',
          'mongodb://127.0.0.1:27017/prac',
        ),
      },
    };
  },
};
