import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/entities/order.entity';
import { Product } from 'src/entities/product.entity';
import { User } from 'src/entities/user.entity';
import { OrderService } from './services/order.service';
import { OrderController } from './controllers/order.controller';
import { OrderGateway } from './gateway/order.gateway';
import { OrderClientsSocketService } from './services/order-clients-socket.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Product, Order])],
  controllers: [OrderController],
  providers: [OrderService, OrderGateway, OrderClientsSocketService],
})
export class OrderModule {}
