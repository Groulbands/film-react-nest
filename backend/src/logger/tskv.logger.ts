import { Injectable, LoggerService } from '@nestjs/common';
import { stringifyValue } from './log-format';

/** TSKV is a single-line, tab-separated sequence of string key=value fields. */
export function escapeTskv(value: unknown): string {
  return stringifyValue(value)
    .replace(/\\/g, '\\\\')
    .replace(/\t/g, '\\t')
    .replace(/\r/g, '\\r')
    .replace(/\n/g, '\\n');
}

@Injectable()
export class TskvLogger implements LoggerService {
  formatMessage(level: string, message: unknown, ...optionalParams: unknown[]): string {
    const fields: Array<[string, unknown]> = [
      ['timestamp', new Date().toISOString()],
      ['level', level],
      ['message', message],
    ];
    if (optionalParams.length > 0) fields.push(['optionalParams', optionalParams]);
    return fields.map(([key, value]) => `${key}=${escapeTskv(value)}`).join('\t');
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
