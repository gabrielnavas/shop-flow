import { Module } from '@nestjs/common';
import { ProductService } from './services/product.service';
import { ProductController } from './controllers/product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/entities/product.entity';
import { MidiaModule } from 'src/midia/midia.module';
import { Category } from 'src/entities/category.entity';
import { CategoryController } from './controllers/category.controller';
import { CategoryService } from './services/category.service';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Product]), MidiaModule],
  controllers: [CategoryController, ProductController],
  providers: [CategoryService, ProductService],
})
export class ProductModule {}
