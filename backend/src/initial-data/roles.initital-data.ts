import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleName } from 'src/entities/role-name.enum';
import { Role } from 'src/entities/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RolesInititalData implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  async onApplicationBootstrap() {
    const names = [RoleName.ADMIN, RoleName.CONSUMER];

    await Promise.all(
      names.map(async (name) => {
        const existing = await this.roleRepository.findOneBy({ name });
        if (!existing) {
          const newRoom = this.roleRepository.create({
            name,
          });
          await this.roleRepository.save(newRoom);
        }
      }),
    );
  }
}
