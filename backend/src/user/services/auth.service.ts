import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { SignInDto, SignUpDto } from 'src/user/types';
import { User } from 'src/entities/user.entity';
import { RoleName } from 'src/entities/role-name.enum';
import { UserRole } from 'src/entities/user-role.entity';
import { Role } from 'src/entities/role.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(UserRole)
    private userRoleRepository: Repository<UserRole>,
    private jwtService: JwtService,
  ) {}

  async signup(data: SignUpDto): Promise<void> {
    const queryRunner =
      this.userRepository.manager.connection.createQueryRunner();

    // Inicia a transação
    await queryRunner.startTransaction();

    try {
      // Tratar os dados, tirar espaços, verificar se dados estão válidos
      const saltOrRounds = 10;
      const passwordHash = await bcrypt.hash(data.password, saltOrRounds);

      // Verifica se o papel (role) existe
      const role = await queryRunner.manager.findOne(Role, {
        where: { name: RoleName.CONSUMER },
      });
      if (!role) {
        throw new Error(`missing role ${RoleName.CONSUMER}`);
      }

      // Cria o novo usuário
      const user = this.userRepository.create({
        email: data.email,
        name: data.fullname,
        password: passwordHash,
      });

      await queryRunner.manager.save(user);
      const userRole = this.userRoleRepository.create({
        role: role,
        user: user,
      });

      await queryRunner.manager.save(userRole);

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async signin(data: SignInDto): Promise<{ accessToken: string }> {
    const user = await this.userRepository.findOneBy({
      email: data.email.trim(),
    });
    if (user === null) {
      throw new Error(`e-mail or password invalid`);
    }
    const passwordEquals = bcrypt.compareSync(data.password, user.password);
    if (!passwordEquals) {
      throw new Error(`e-mail or password invalid`);
    }

    user.userRoles = await this.userRoleRepository.findBy({
      user: user,
    });

    const payload = {
      sub: user.id,
      roles: user.userRoles.map((userRole) => userRole.role.name),
    };
    const token = await this.jwtService.signAsync(payload);
    return {
      accessToken: token,
    };
  }
}
