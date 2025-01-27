import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entities/category.entity';

import { Repository } from 'typeorm';

@Injectable()
export class CategoriesInititalData implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async onApplicationBootstrap() {
    const categoryNames = ['Cozinha', 'Eletrodoméstico'];

    await Promise.all(
      categoryNames.map(async (categoryName): Promise<void> => {
        const exists = await this.categoryRepository.findOneBy({
          name: categoryName,
        });
        if (!exists) {
          const category = this.categoryRepository.create({
            name: categoryName,
          });
          await this.categoryRepository.save(category);
        }
      }),
    );
  }
}
