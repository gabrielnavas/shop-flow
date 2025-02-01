import { Controller, Get, UseFilters } from '@nestjs/common';
import { ErrorExceptionFilter } from '../filters/error-exception.filter';
import { CategoryService } from '../services/category.service';

@UseFilters(new ErrorExceptionFilter())
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  findProducts() {
    return this.categoryService.findCategories();
  }
}
