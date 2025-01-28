import { Injectable } from '@nestjs/common';
import { AddProductToCartDto } from '../dtos';
import { CartItem } from 'src/entities/cart-item.entity';
import { EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { UserNotFoundException } from 'src/user/exceptions/user-not-found.exception';

@Injectable()
export class CartService {
  constructor(
    private readonly entityManager: EntityManager,
    @InjectRepository(CartItem)
    private readonly cartRepository: Repository<CartItem>,
  ) {}

  async addProductToCart(
    dto: AddProductToCartDto,
    loggedUserId: number,
  ): Promise<void> {
    const userFound = await this.entityManager.findOneBy(User, {
      id: loggedUserId,
    });
    if (!userFound) {
      throw new UserNotFoundException();
    }

    const cartItemFound = await this.entityManager.findOneBy(CartItem, {
      productId: dto.productId,
      userId: userFound.id,
    });
    if (cartItemFound) {
      await this.entityManager.update(
        CartItem,
        {
          productId: dto.productId,
          userId: userFound.id,
        },
        {
          quantity: dto.quantity,
        },
      );
    } else {
      const cartItem = this.entityManager.create(CartItem, {
        productId: dto.productId,
        userId: userFound.id,
        quantity: dto.quantity,
        createdAt: new Date(),
      });
      await this.entityManager.save(cartItem);
    }
  }

  async getCartItems(loggedUserId: number): Promise<CartItem[]> {
    const userFound = await this.entityManager.findOneBy(User, {
      id: loggedUserId,
    });
    if (!userFound) {
      throw new UserNotFoundException();
    }

    const cartItems = await this.cartRepository.find({
      where: { userId: userFound.id },
      relations: {
        product: {
          category: true,
        },
      },
    });
    return cartItems;
  }
}
