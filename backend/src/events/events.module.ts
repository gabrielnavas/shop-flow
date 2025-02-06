import { Module } from '@nestjs/common';
import { ClientsSocketService } from './services/clients-socket.service';
import { User } from 'src/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsGateway } from './gateway/events.gateway';

@Module({
  providers: [EventsGateway, ClientsSocketService],
  imports: [TypeOrmModule.forFeature([User])],
})
export class EventsModule {}
