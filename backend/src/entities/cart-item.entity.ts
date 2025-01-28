import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from './user.entity';
import { Product } from './product.entity';

@Entity()
export class CartItem {
  @PrimaryColumn({ name: 'users_id' })
  userId: number;

  @PrimaryColumn({ name: 'product_id' })
  productId: number;

  @ManyToOne(() => User, (user) => user.cartItems, { eager: true })
  @JoinColumn({ name: 'users_id' })
  user: User;

  @ManyToOne(() => Product, (product) => product.cartItems, { eager: true })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column({ nullable: false })
  quantity: number;

  @Column({ name: 'created_at', nullable: false })
  createdAt: Date;
}
