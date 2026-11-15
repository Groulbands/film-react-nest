import { ConfigService } from '@nestjs/config';

export interface AppConfigDatabase {
  driver: 'postgres';
  url: string;
  username: string;
  password: string;
}

export interface AppConfig {
  port: number;
  database: AppConfigDatabase;
}

export const configProvider = {
  provide: 'CONFIG',
  inject: [ConfigService],
  useFactory: (config: ConfigService): AppConfig => {
    const driver = config.get<string>('DATABASE_DRIVER', 'postgres');
    if (driver !== 'postgres') {
      throw new Error('DATABASE_DRIVER должен быть postgres');
    }

    const port = Number(config.get<string>('PORT', '3000'));
    if (!Number.isInteger(port) || port < 1 || port > 65535) {
      throw new Error('PORT должен быть корректным номером порта');
    }

    const url = config.get<string>('DATABASE_URL', 'postgres://localhost:5432/films');
    const username = config.get<string>('DATABASE_USERNAME');
    const password = config.get<string>('DATABASE_PASSWORD');
    if (!username || !password) {
      throw new Error('Необходимо задать DATABASE_USERNAME и DATABASE_PASSWORD в .env');
    }

    return { port, database: { driver, url, username, password } };
  },
};
