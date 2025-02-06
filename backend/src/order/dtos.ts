import { OrderStatusName } from 'src/entities/order-status-name';
import { ProductDto } from 'src/product/dtos';
import { UserDto } from 'src/user/dtos';

type OrderStatusNameDto = OrderStatusName;

export type OrderItemDto = {
  product: ProductDto;
  unitPrice: number;
  totalPrice: number;
  quantity: number;
};

export type OrderDto = {
  user: UserDto;
  totalPrice: number;
  orderStatusName: OrderStatusNameDto;
  orderItems: OrderItemDto[];
  createdAt: Date;
};
