import { Injectable } from '@nestjs/common';
import { SignUpDto } from '../types';

import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleName } from 'src/entities/role-name.enum';
import { UserRole } from 'src/entities/user-role.entity';
import { Role } from 'src/entities/role.entity';
import { QueryRunner } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(UserRole)
    private userRoleRepository: Repository<UserRole>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
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

      // Salva o novo usuário primeiro
      await queryRunner.manager.save(user);

      // Cria a relação entre o usuário e o papel
      const userRole = this.userRoleRepository.create({
        role: role,
        user: user, // Agora user.id está garantido
      });

      // Salva o papel do usuário
      await queryRunner.manager.save(userRole);

      // Confirma a transação
      await queryRunner.commitTransaction();
    } catch (error) {
      // Caso ocorra um erro, desfaz a transação
      await queryRunner.rollbackTransaction();
      throw error; // Relança o erro para que ele seja tratado corretamente
    } finally {
      // Libera o queryRunner
      await queryRunner.release();
    }
  }
}
