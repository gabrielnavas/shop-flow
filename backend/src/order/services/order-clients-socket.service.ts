import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Socket } from 'socket.io';
import { OrderStatusName } from 'src/entities/order-status-name';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

type SocketId = string;
type UserId = number;
type Value = {
  userId: UserId;
  socket: Socket;
};

type UpdateOrderStatusNameGatewayDto = {
  userId: number;
  orderId: number;
  orderStatusName: OrderStatusName;
  orderUpdatedAt: Date;
};

const socketEventNames = {
  updateOrderStatusName: 'updateOrderStatusName',
};

@Injectable()
export class OrderClientsSocketService {
  private clients = new Map<SocketId, Value>();

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async addUser(client: Socket, userId: UserId) {
    const clientFound = this.getClient(userId);
    if (clientFound === null) {
      const userFound = await this.userRepository.findOne({
        where: {
          id: userId,
        },
      });
      if (userFound !== null) {
        this.clients.set(client.id, {
          socket: client,
          userId,
        });
      }
    }
  }

  removeClient(socketId: SocketId) {
    this.clients.delete(socketId);
  }

  getClient(userId: UserId): Value | null {
    for (const entry of this.clients.entries()) {
      if (entry[1].userId === userId) {
        return entry[1];
      }
    }
    return null;
  }

  updateOrderStatusName(dto: UpdateOrderStatusNameGatewayDto) {
    const client = this.getClient(dto.userId);
    if (client === null) {
      return;
    }

    const payload = {
      orderId: dto.orderId,
      orderStatusName: dto.orderStatusName,
      updatedAt: dto.orderUpdatedAt,
    };
    client.socket.broadcast.emit(
      socketEventNames.updateOrderStatusName,
      payload,
    );
    client.socket.emit(socketEventNames.updateOrderStatusName, payload);
  }
}
