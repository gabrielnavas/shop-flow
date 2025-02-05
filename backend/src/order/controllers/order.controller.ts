import { Body, Controller, Post } from '@nestjs/common';
import { NewOrderDto } from '../types';
import { OrderService } from '../services/order.service';
import { LoggedUser } from 'src/user/decorators/logged-user.decorator';
import { Token } from 'src/user/models';
import { SetRoles } from 'src/user/guards/set-roles';
import { RoleName } from 'src/entities/role-name.enum';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @SetRoles(RoleName.CONSUMER)
  async newOrder(@LoggedUser() user: Token, @Body() dto: NewOrderDto) {
    await this.orderService.newOrder(user.sub, dto);
  }
}
