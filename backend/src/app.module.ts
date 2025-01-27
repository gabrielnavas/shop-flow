import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { RolesInititalData } from './initial-data/roles.initital-data';
import { Role } from './entities/role.entity';
import { JwtModule } from '@nestjs/jwt';
import { UsersInititalData } from './initial-data/users.initital-data';
import { AuthService } from './user/services/auth.service';
import { User } from './entities/user.entity';
import { UserRole } from './entities/user-role.entity';
import { CategoriesInititalData } from './initial-data/categories.initital-data';
import { Category } from './entities/category.entity';
import { APP_GUARD } from '@nestjs/core';
import { RolesJwt } from './guards/roles-jwt.guard';
import { ProductModule } from './product/product.module';

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
    UserModule,
    ProductModule,
  ],
  controllers: [],
  providers: [
    AuthService,
    RolesInititalData,
    UsersInititalData,
    CategoriesInititalData,
    {
      provide: APP_GUARD,
      useClass: RolesJwt,
    },
  ],
})
export class AppModule {}
