import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

export class ClientsSocketService {
  // Map<socket id, user id>
  private clients = new Map<string, number>();

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async addUser(socketId: string, userId: number) {
    console.log('addUser', socketId, userId, this.clients);

    if (!this.existsUser(userId)) {
      const userFound = await this.userRepository.findOne({
        where: {
          id: userId,
        },
      });
      if (userFound !== null) {
        this.clients.set(socketId, userFound.id);
      }
    }
  }

  removeClient(socketId: string) {
    this.clients.delete(socketId);
  }

  existsUser(userId: number): boolean {
    for (const uId of this.clients.values()) {
      if (uId === userId) {
        return true;
      }
    }
    return false;
  }
}
