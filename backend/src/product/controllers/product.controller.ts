import { Body, Controller, Get, Post } from '@nestjs/common';
import { AddProductDto } from '../dtos';
import { Roles } from 'src/guards/roles-jwt.guard';
import { RoleName } from 'src/entities/role-name.enum';
import { ProductService } from '../services/product.service';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post()
  @Roles(RoleName.ADMIN, RoleName.CONSUMER)
  async addProduct(@Body() dto: AddProductDto) {
    await this.productService.addProduct(dto);
  }

  @Get()
  @Roles(RoleName.CONSUMER)
  async findProducts() {
    return await this.productService.findProducts();
  }
}
