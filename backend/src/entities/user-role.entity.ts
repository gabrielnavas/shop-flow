import { Entity, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { User } from './user.entity';
import { Role } from './role.entity';

@Entity({ name: 'user_roles' })
export class UserRole {
  @PrimaryColumn({ name: 'users_id' })
  userId: number;

  @PrimaryColumn({ name: 'role_id' })
  roleId: number;

  @ManyToOne(() => User, (user) => user.userRoles, { eager: true })
  @JoinColumn({ name: 'users_id' })
  user: User;

  @ManyToOne(() => Role, (role) => role.userRoles, { eager: true })
  @JoinColumn({ name: 'role_id' })
  role: Role;
}
