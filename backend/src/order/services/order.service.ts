import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';

import { NewOrderDto } from '../types';
import { Product } from 'src/entities/product.entity';
import { ProductNotFoundException } from 'src/order/exceptions/product-not-found-exception';
import { User } from 'src/entities/user.entity';
import { UserNotFoundException } from '../exceptions/user-not-found-exception copy';
import { OrderStatus } from 'src/entities/order-status.entity';
import { OrderStatusName } from 'src/entities/order-status-name';
import { Order } from 'src/entities/order.entity';
import { OrderItem } from 'src/entities/order-item.entity';
import { OrderStatusNotFoundException } from '../exceptions/order-status-not-found-exception';
import { CartItem } from 'src/entities/cart-item.entity';
import { CartItemNotFoundException } from '../exceptions/cart-item-not-found-exception';
import { OrderItemPriceIsWrongException } from '../exceptions/order-item-price-is-wrong-exception';

@Injectable()
export class OrderService {
  constructor(private readonly entityManager: EntityManager) {}

  async newOrder(loggedUserId: number, dto: NewOrderDto) {
    const queryRunner = this.entityManager.connection.createQueryRunner();

    await queryRunner.startTransaction();

    const user = await this.entityManager.findOneBy(User, {
      id: loggedUserId,
    });
    if (user === null) {
      throw new UserNotFoundException();
    }

    try {
      const orderStatus = await this.entityManager.findOneBy(OrderStatus, {
        name: OrderStatusName.PENDING,
      });

      if (orderStatus === null) {
        throw new OrderStatusNotFoundException();
      }

      const order = this.entityManager.create(Order, {
        user: user,
        createdAt: new Date(),
        orderStatus: orderStatus,
        totalPrice: dto.orderItems.reduce(
          (acc, orderItem) => acc + orderItem.unitPrice * orderItem.quantity,
          0,
        ),
      });

      await this.entityManager.save(Order, order);

      const promises = dto.orderItems.map(async (orderItemDto) => {
        const product = await this.entityManager.findOneBy(Product, {
          id: orderItemDto.productId,
        });
        if (product === null) {
          throw new ProductNotFoundException();
        }

        const cartItem = await this.entityManager.findOne(CartItem, {
          where: {
            userId: user.id,
            productId: orderItemDto.productId,
          },
        });
        if (cartItem === null) {
          throw new CartItemNotFoundException(product.name);
        }

        if (cartItem.quantity !== orderItemDto.quantity) {
          throw new OrderItemPriceIsWrongException();
        }

        const orderItem = this.entityManager.create(OrderItem, {
          order: order,
          product: cartItem.product,
          quantity: cartItem.quantity,
          unitPrice: orderItemDto.unitPrice,
          totalPrice: orderItemDto.unitPrice * orderItemDto.quantity,
        });

        await this.entityManager.delete(CartItem, cartItem);

        return this.entityManager.save(OrderItem, orderItem);
      });

      await Promise.all(promises);

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
