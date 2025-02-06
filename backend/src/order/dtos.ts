import { OrderStatusName } from 'src/entities/order-status-name';
import { ProductDto } from 'src/product/dtos';
import { UserDto } from 'src/user/dtos';

export type OrderItemDto = {
  product: ProductDto;
  unitPrice: number;
  totalPrice: number;
  quantity: number;
};

export type OrderDto = {
  id: number;
  user: UserDto;
  totalPrice: number;
  orderStatusName: OrderStatusName;
  orderItems: OrderItemDto[];
  createdAt: Date;
};

export type UpdateOrderStatusDto = {
  orderId: number;
  orderStatusName: OrderStatusName;
};
