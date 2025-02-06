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
import { Server, Socket } from 'socket.io';
import { ClientsSocketService } from '../services/clients-socket.service';
import { JwtService } from '@nestjs/jwt';
import { Token } from 'src/user/models';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway
  implements OnGatewayConnection, OnGatewayInit, OnGatewayDisconnect
{
  constructor(
    private readonly clientsSocketService: ClientsSocketService,
    private readonly jwtService: JwtService,
  ) {}

  @WebSocketServer()
  server: Server;

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
      await this.clientsSocketService.addUser(client.id, token.sub);
    } catch (err) {
      console.log(err);
    }
    console.log(client.id, body);
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
