import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { RoleName } from 'src/entities/role-name.enum';

import { AuthService } from 'src/user/services/auth.service';

@Injectable()
export class UsersInititalData implements OnApplicationBootstrap {
  constructor(private authService: AuthService) {}

  async onApplicationBootstrap() {
    try {
      await this.authService.signup(
        {
          email: 'admin@email.com',
          fullname: 'admin admin',
          password: '12345678',
        },
        [RoleName.ADMIN, RoleName.CONSUMER],
      );
    } catch (err) {
      console.log((err as Error).message);
    }
  }
}
