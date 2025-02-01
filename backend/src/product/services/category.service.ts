import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entities/category.entity';
import { Repository } from 'typeorm';
import { CategoryDto } from '../dtos';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async findCategories(): Promise<CategoryDto[]> {
    const categories = await this.categoryRepository.find();
    return categories.map((category) => this.mapEntityToDto(category));
  }

  mapEntityToDto(category: Category): CategoryDto {
    return {
      id: category.id,
      name: category.name,
    };
  }
}
