import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { APP_FILTER } from '@nestjs/core';

import { UserModule } from './user/user.module';
import { AuthService } from './user/services/auth.service';

import { Role } from './entities/role.entity';
import { User } from './entities/user.entity';
import { UserRole } from './entities/user-role.entity';
import { Category } from './entities/category.entity';

import { ProductModule } from './product/product.module';
import { InititalDataModule } from './initial-data/initial-data.module';
import { CartModule } from './cart/cart.module';
import { MidiaModule } from './midia/midia.module';
import { ErrorGenericExceptionFilter } from './filters/error-generic-exception.filter';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: Number(process.env.MYSQL_PORT),
      username: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      entities: [__dirname + '/**/*.entity.{js,ts}'],
      migrations: [__dirname + '/migrations/*.{js,ts}'],
      synchronize: false,
    }),
    TypeOrmModule.forFeature([Role, User, UserRole, Category]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '7d' },
    }),
    InititalDataModule,
    MidiaModule,
    UserModule,
    ProductModule,
    CartModule,
    OrderModule,
  ],
  controllers: [],
  providers: [
    AuthService,
    {
      provide: APP_FILTER,
      useClass: ErrorGenericExceptionFilter,
    },
  ],
})
export class AppModule {}
