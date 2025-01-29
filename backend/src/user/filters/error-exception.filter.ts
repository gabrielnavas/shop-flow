import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { UserAlreadyExistsEmail } from '../exceptions/user-already-exists-email.exception';
import { UserNotFoundException } from '../exceptions/user-not-found.exception';
import { UserPasswordInvalidException } from '../exceptions/user-password-invalid.exception';
import { HttpResponseException } from 'src/filters/types';

@Catch(
  UserAlreadyExistsEmail,
  UserNotFoundException,
  UserPasswordInvalidException,
)
export class ErrorExceptionFilter implements ExceptionFilter {
  catch(error: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    response.status(HttpStatus.BAD_REQUEST).json({
      message: error.message,
      statusCode: HttpStatus.BAD_REQUEST,
      timestamp: new Date().toISOString(),
      path: request.url,
    } as HttpResponseException);
  }
}
