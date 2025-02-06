import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  UseFilters,
  UseGuards,
} from '@nestjs/common';

import { NewOrderDto } from '../types';
import { OrderService } from '../services/order.service';
import { LoggedUser } from 'src/user/decorators/logged-user.decorator';
import { Token } from 'src/user/models';
import { SetRoles } from 'src/guards/set-roles';
import { RoleName } from 'src/entities/role-name.enum';
import { OrderDto, UpdateOrderStatusDto } from '../dtos';
import { RolesJwt } from 'src/user/guards/roles-jwt.guard';
import { ErrorExceptionFilter } from '../filters/error-exception.filter';
import { OrderClientsSocketService } from '../services/order-clients-socket.service';

@UseFilters(new ErrorExceptionFilter())
@UseGuards(RolesJwt)
@Controller('order')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly orderClientsSocketService: OrderClientsSocketService,
  ) {}

  @Post()
  @SetRoles(RoleName.CONSUMER)
  async newOrder(@LoggedUser() user: Token, @Body() dto: NewOrderDto) {
    await this.orderService.newOrder(user.sub, dto);
  }

  @Get()
  @SetRoles(RoleName.CONSUMER)
  async findOrdersByLoggedUser(@LoggedUser() user: Token): Promise<OrderDto[]> {
    try {
      const orders = await this.orderService.findOrdersByLoggedUser(user.sub);
      return orders;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  @Put()
  @SetRoles(RoleName.ADMIN)
  async updateOrderStatus(
    @LoggedUser() user: Token,
    @Body() dto: UpdateOrderStatusDto,
  ): Promise<void> {
    const order = await this.orderService.updateOrderStatus(dto);
    this.orderClientsSocketService.updateOrderStatusName({
      userId: order.user.id,
      orderId: order.id,
      orderStatusName: order.orderStatus.name,
      orderUpdatedAt: order.updatedAt!,
    });
  }
}
