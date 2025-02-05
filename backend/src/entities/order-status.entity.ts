import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './order.entity';
import { OrderStatusName } from './order-status-name';

@Entity()
export class OrderStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: OrderStatusName,
    default: OrderStatusName.PENDING,
    unique: true,
    nullable: false,
  })
  name: OrderStatusName;

  @OneToMany(() => Order, (order) => order.orderStatus)
  orders: Order[];
}
