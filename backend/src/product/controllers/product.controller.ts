import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';

import { AddProductDto, ProductDto } from '../dtos';
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

    await this.productService.updateProduct(product.id, product);
    return { url };
  }

  @Get()
  async findProducts(): Promise<ProductDto[]> {
    return await this.productService.findProducts();
  }
}
