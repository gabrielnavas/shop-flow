import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

import { HttpResponseException } from 'src/filters/types';
import { UserNotFoundException } from 'src/user/exceptions/user-not-found.exception';
import { ProductNotFoundException } from 'src/product/exceptions/product-not-found-by-exception';
import { CartItemNotFoundException } from '../exceptions/cart-item-not-found-exception';
import { QuantityExceedsStockException } from '../exceptions/quantity-exceeds-stock-exception';
import { QuantityZeroException } from '../exceptions/quantity-zero-exception';

@Catch(
  UserNotFoundException,
  ProductNotFoundException,
  CartItemNotFoundException,
  QuantityExceedsStockException,
  QuantityZeroException,
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
