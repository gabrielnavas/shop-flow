import { Body, Controller, Get, Post } from '@nestjs/common';
import { AddProductToCartDto } from '../dtos';
import { CartService } from '../services/cart.service';
import { SetRoles } from 'src/user/guards/set-roles';
import { RoleName } from 'src/entities/role-name.enum';
import { LoggedUser } from 'src/user/decorators/logged-user.decorator';
import { Token } from 'src/user/models';

@Controller('cart-item')
export class CartController {
  constructor(private cartService: CartService) {}

  @Post()
  @SetRoles(RoleName.CONSUMER)
  async addProductToCart(
    @Body() dto: AddProductToCartDto,
    @LoggedUser() loggedUser: Token,
  ) {
    await this.cartService.addProductToCart(dto, loggedUser.sub);
  }

  // TODO: adicionar isso no context no frontend, pra quando carregar, vir os cartitems
  @Get()
  @SetRoles(RoleName.CONSUMER)
  async getCartItems(@LoggedUser() loggedUser: Token) {
    const cartItems = await this.cartService.getCartItems(loggedUser.sub);
    const cartItemsMapped = cartItems.map((cartItem) => ({
      product: {
        id: cartItem.product.id,
        name: cartItem.product.name,
        description: cartItem.product.description,
        price: cartItem.product.price,
        stock: cartItem.product.stock,
        createdAt: cartItem.product.createdAt,
        updatedAt: cartItem.product.updatedAt,
        category: {
          id: cartItem.product.category.id,
          name: cartItem.product.category.name,
        },
      },
      quantity: cartItem.quantity,
      createdAt: cartItem.createdAt,
    }));
    return cartItemsMapped;
  }
}
