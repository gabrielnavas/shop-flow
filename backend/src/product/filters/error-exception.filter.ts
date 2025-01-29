import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

import { HttpResponseException } from 'src/filters/types';
import { CategoryNotFoundException } from '../exceptions/category-not-found-by-exception';
import { ProductAlreadyExistsWithNameException } from '../exceptions/product-already-exists-with-name-exception';

@Catch(CategoryNotFoundException, ProductAlreadyExistsWithNameException)
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
