import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class ApiErrorFilter implements ExceptionFilter {
  catch(error: unknown, host: ArgumentsHost): void {
    const response = host.switchToHttp().getResponse<Response>();
    const status = error instanceof HttpException
      ? error.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;
    const message = error instanceof HttpException
      ? error.message
      : 'Внутренняя ошибка сервера';
    response.status(status).json({ error: message });
  }
}
