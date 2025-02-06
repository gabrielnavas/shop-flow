import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

import { HttpResponseException } from 'src/filters/types';
import { UserNotFoundException } from '../exceptions/user-not-found-exception copy';
import { OrderStatusNotFoundException } from '../exceptions/order-status-not-found-exception';
import { ProductNotFoundException } from '../exceptions/product-not-found-exception';
import { CartItemNotFoundException } from '../exceptions/cart-item-not-found-exception';
import { OrderItemPriceIsWrongException } from '../exceptions/order-item-price-is-wrong-exception';

@Catch(
  UserNotFoundException,
  OrderStatusNotFoundException,
  ProductNotFoundException,
  CartItemNotFoundException,
  OrderItemPriceIsWrongException,
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
