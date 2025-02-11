import { Module } from '@nestjs/common';
import { RolesInititalData } from './roles.initital-data';
import { UsersInititalData } from './users.initital-data';
import { CategoriesInititalData } from './categories.initital-data';
import { Category } from 'src/entities/category.entity';
import { UserRole } from 'src/entities/user-role.entity';
import { User } from 'src/entities/user.entity';
import { Role } from 'src/entities/role.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from 'src/user/services/auth.service';
import { FakeInititalData } from './fake.initital-data';
import { ProductService } from 'src/product/services/product.service';
import { Product } from 'src/entities/product.entity';
import { OrderStatusInititalData } from './order-status.initital-data';
import { OrderStatus } from 'src/entities/order-status.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Role,
      User,
      UserRole,
      Category,
      Product,
      OrderStatus,
    ]),
  ],
  providers: [
    RolesInititalData,
    UsersInititalData,
    CategoriesInititalData,
    OrderStatusInititalData,
    FakeInititalData,

    AuthService,
    ProductService,
  ].concat(process.env.ENV === 'development' ? FakeInititalData : []),
})
export class InititalDataModule {}
