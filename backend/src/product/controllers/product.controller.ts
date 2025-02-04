import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';

import { AddProductDto, ProductDto, UpdateProductDto } from '../dtos';
import { RoleName } from 'src/entities/role-name.enum';
import { ProductService } from '../services/product.service';
import { SetRoles } from 'src/user/guards/set-roles';
import { FileInterceptor } from '@nestjs/platform-express';
import { MidiaService } from 'src/midia/midia.service';
import { ErrorExceptionFilter } from '../filters/error-exception.filter';

@UseFilters(new ErrorExceptionFilter())
@Controller('product')
export class ProductController {
  constructor(
    private productService: ProductService,
    private readonly midiaService: MidiaService,
  ) {}

  @Post()
  @SetRoles(RoleName.ADMIN, RoleName.CONSUMER)
  async addProduct(@Body() dto: AddProductDto) {
    const product = await this.productService.addProduct(dto);
    return product;
  }

  @Delete(':productId')
  @SetRoles(RoleName.ADMIN, RoleName.CONSUMER)
  async removeProduct(@Param('productId') productId: number) {
    await this.productService.removeProduct(productId);
  }

  @Delete()
  @SetRoles(RoleName.ADMIN, RoleName.CONSUMER)
  async removeProducts(@Query('productIds') productIds: string) {
    const ids = productIds.split(',').map(Number); // Converte para array de números
    await this.productService.removeProducts({ productIds: ids });
  }

  @Put(':productId')
  @SetRoles(RoleName.ADMIN, RoleName.CONSUMER)
  async updateProduct(
    @Param('productId') productId: string,
    @Body() dto: UpdateProductDto,
  ) {
    const productUpdated = await this.productService.updateProduct(
      Number(productId),
      dto,
    );
    return productUpdated;
  }

  // TODO: Otimizar upload para suportar arquivos grandes.
  @Put(':productId/image')
  @UseInterceptors(FileInterceptor('file'))
  @SetRoles(RoleName.ADMIN)
  async addProductImage(
    @Param('productId') productId: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const product = await this.productService.findProductById(productId);

    const productBucketName = 'products-images';
    const url = await this.midiaService.uploadFile(file, productBucketName);
    product.imageUrl = url;

    await this.productService.updateProduct(product.id, {
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      imageUrl: product.imageUrl,
      categoryName: product.category.name,
    });
    return { url };
  }

  @Get()
  async findProducts(@Query('q') query: string): Promise<ProductDto[]> {
    return await this.productService.findProducts(query);
  }
}
