import { Module } from '@nestjs/common';
import { ProductService } from './services/product.service';
import { ProductController } from './controllers/product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/entities/product.entity';
import { MidiaModule } from 'src/midia/midia.module';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), MidiaModule],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
