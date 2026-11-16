import { Injectable, LoggerService } from '@nestjs/common';
import { safeStringify } from './log-format';

@Injectable()
export class JsonLogger implements LoggerService {
  formatMessage(
    level: string,
    message: unknown,
    ...optionalParams: unknown[]
  ): string {
    return safeStringify({
      timestamp: new Date().toISOString(),
      level,
      message,
      ...(optionalParams.length > 0 ? { optionalParams } : {}),
    });
  }

  log(message: unknown, ...optionalParams: unknown[]): void {
    console.log(this.formatMessage('log', message, ...optionalParams));
  }

  error(message: unknown, ...optionalParams: unknown[]): void {
    console.error(this.formatMessage('error', message, ...optionalParams));
  }

  warn(message: unknown, ...optionalParams: unknown[]): void {
    console.warn(this.formatMessage('warn', message, ...optionalParams));
  }

  debug(message: unknown, ...optionalParams: unknown[]): void {
    console.debug(this.formatMessage('debug', message, ...optionalParams));
  }

  verbose(message: unknown, ...optionalParams: unknown[]): void {
    console.debug(this.formatMessage('verbose', message, ...optionalParams));
  }

  fatal(message: unknown, ...optionalParams: unknown[]): void {
    console.error(this.formatMessage('fatal', message, ...optionalParams));
  }
}
