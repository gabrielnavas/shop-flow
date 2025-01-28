import { Body, Controller, Get, Post } from '@nestjs/common';
import { AddProductDto, ProductDto } from '../dtos';
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
  async findProducts(): Promise<ProductDto[]> {
    return await this.productService.findProducts();
  }
}
