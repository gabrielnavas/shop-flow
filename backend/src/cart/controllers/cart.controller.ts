import { Body, Controller, Get, Post, Put, UseFilters } from '@nestjs/common';
import { AddProductToCartDto, QuantityItemBody } from '../dtos';
import { CartService } from '../services/cart.service';
import { SetRoles } from 'src/user/guards/set-roles';
import { RoleName } from 'src/entities/role-name.enum';
import { LoggedUser } from 'src/user/decorators/logged-user.decorator';
import { Token } from 'src/user/models';
import { ErrorExceptionFilter } from '../filters/error-exception.filter';

@Controller('cart-item')
@UseFilters(new ErrorExceptionFilter())
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

  @Put('increment-quantity')
  @SetRoles(RoleName.CONSUMER)
  async incrementQuantityItem(
    @LoggedUser() loggedUser: Token,
    @Body() dto: QuantityItemBody,
  ) {
    await this.cartService.incrementQuantityItem(loggedUser.sub, dto);
  }

  @Put('decrement-quantity')
  @SetRoles(RoleName.CONSUMER)
  async decrementQuantityItem(
    @LoggedUser() loggedUser: Token,
    @Body() dto: QuantityItemBody,
  ) {
    await this.cartService.decrementQuantityItem(loggedUser.sub, dto);
  }
}
