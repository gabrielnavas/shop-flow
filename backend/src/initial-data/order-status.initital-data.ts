import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderStatusName } from 'src/entities/order-status-name';
import { OrderStatus } from 'src/entities/order-status.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderStatusInititalData implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(OrderStatus)
    private orderStatus: Repository<OrderStatus>,
  ) {}

  async onApplicationBootstrap() {
    const orderStatusNames = Object.values(OrderStatusName);

    await Promise.all(
      orderStatusNames.map(async (orderStatusName) => {
        const existing = await this.orderStatus.findOneBy({
          name: orderStatusName,
        });
        if (!existing) {
          const newOrderStatus = this.orderStatus.create({
            name: orderStatusName,
          });
          await this.orderStatus.save(newOrderStatus);
        }
      }),
    );
  }
}
