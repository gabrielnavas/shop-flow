import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { HttpResponseException } from './types';

@Catch()
export class ErrorGenericExceptionFilter implements ExceptionFilter {
  catch(err: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    console.log(err);

    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      message: 'Algo aconteceu. Tente novamente mais tarde.',
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      timestamp: new Date().toISOString(),
      path: request.url,
    } as HttpResponseException);
  }
}
