import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Product } from './product.entity';
import { Order } from './order.entity';

@Entity()
export class OrderItem {
  @PrimaryColumn({ name: 'product_id' })
  productId: number;

  @PrimaryColumn({ name: 'order_id' })
  orderId: number;

  @ManyToOne(() => Product, (product) => product.orderItems, { eager: true })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @ManyToOne(() => Order, (order) => order.orderItems, { eager: true })
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @Column({ nullable: false })
  quantity: number;

  @Column({ name: 'unit_price', nullable: false })
  unitPrice: number;

  @Column({ name: 'total_price', nullable: false })
  totalPrice: number;
}
