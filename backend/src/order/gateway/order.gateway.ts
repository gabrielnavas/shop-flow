import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Namespace, Server, Socket } from 'socket.io';
import { OrderClientsSocketService } from '../services/order-clients-socket.service';
import { JwtService } from '@nestjs/jwt';
import { Token } from 'src/user/models';
import { UnauthorizedException } from '@nestjs/common';

@WebSocketGateway({
  namespace: 'order',
  cors: {
    origin: '*',
  },
})
export class OrderGateway
  implements OnGatewayConnection, OnGatewayInit, OnGatewayDisconnect
{
  constructor(
    private readonly orderClientsSocketService: OrderClientsSocketService,
    private readonly jwtService: JwtService,
  ) {}

  @WebSocketServer()
  server: Namespace;

  @SubscribeMessage('authorizate')
  async authorizateEvent(
    @ConnectedSocket() client: Socket,
    @MessageBody() body: { accessToken: string },
  ) {
    if (!body || !body.accessToken) {
      client.disconnect();
    }

    try {
      const token: Token = this.jwtService.decode(body.accessToken);
      await this.orderClientsSocketService.addUser(client, token.sub);
    } catch (err) {
      console.log(err);
      client.disconnect();
      throw new UnauthorizedException('Você não tem permissão');
    }
  }

  handleConnection(client: Socket) {
    if (!client.loggedUser) {
      return;
    }
  }

  handleDisconnect(client: Socket) {
    console.log('handleDisconnect', client instanceof Socket);
  }

  afterInit(server: Server) {
    console.log('afterInit', server instanceof Server);
  }
}
