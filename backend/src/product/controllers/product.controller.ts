import {
  Body,
  Controller,
  Get,
  Post,
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
    await this.productService.addProduct(dto);
  }

  // TODO: Otimizar upload para suportar arquivos grandes.
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @SetRoles(RoleName.ADMIN)
  async addProductImage(@UploadedFile() file: Express.Multer.File) {
    const productBucketName = 'products-images';
    const url = await this.midiaService.uploadFile(file, productBucketName);
    return { url };
  }

  @Get()
  async findProducts(): Promise<ProductDto[]> {
    return await this.productService.findProducts();
  }
}
