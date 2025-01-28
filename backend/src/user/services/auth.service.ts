import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { SignInDto, SignUpDto } from 'src/user/dtos';
import { User } from 'src/entities/user.entity';
import { RoleName } from 'src/entities/role-name.enum';
import { UserRole } from 'src/entities/user-role.entity';
import { Role } from 'src/entities/role.entity';
import { JwtService } from '@nestjs/jwt';
import { UserAlreadyExistsEmail } from 'src/user/exceptions/user-already-exists-email.exception';
import { Token } from '../models';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(UserRole)
    private userRoleRepository: Repository<UserRole>,
    private jwtService: JwtService,
  ) {}

  async signup(
    data: SignUpDto,
    roleNames: RoleName[] = [RoleName.CONSUMER],
  ): Promise<void> {
    const queryRunner =
      this.userRepository.manager.connection.createQueryRunner();

    await queryRunner.startTransaction();

    try {
      const saltOrRounds = 10;
      const passwordHash = await bcrypt.hash(data.password, saltOrRounds);

      const roles = (
        await Promise.all(
          roleNames.map(async (roleName) => {
            return await queryRunner.manager.findOne(Role, {
              where: { name: roleName },
            });
          }),
        )
      ).filter((role) => role !== null);
      if (roles.length === 0) {
        throw new Error(`missing roles ${roleNames.toString()}`);
      }

      const emailAlreadyExists = await queryRunner.manager.findOneBy(User, {
        email: data.email.trim(),
      });
      if (emailAlreadyExists !== null) {
        throw new UserAlreadyExistsEmail();
      }

      const user = this.userRepository.create({
        email: data.email,
        name: data.fullname,
        password: passwordHash,
        createdAt: new Date(),
      });

      await queryRunner.manager.save(user);

      const userRoles = roles.map((role) => {
        return this.userRoleRepository.create({
          role: role,
          user: user,
        });
      });

      await Promise.all(
        userRoles.map(async (userRole) => {
          await queryRunner.manager.save(userRole);
        }),
      );

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

    const payload: Token = {
      sub: user.id,
      roles: user.userRoles.map((userRole) => userRole.role.name),
    };
    const token = await this.jwtService.signAsync(payload);
    return {
      accessToken: token,
    };
  }
}
