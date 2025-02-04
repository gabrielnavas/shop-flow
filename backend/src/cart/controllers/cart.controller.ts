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

  @Get()
  @SetRoles(RoleName.CONSUMER)
  async getCartItems(@LoggedUser() loggedUser: Token) {
    const cartItems = await this.cartService.findCartItems(loggedUser.sub);
    return cartItems;
  }
}
