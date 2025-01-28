import { Injectable } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { AddProductDto, ProductDto } from '../dtos';
import { Category } from 'src/entities/category.entity';
import { Product } from 'src/entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductAlreadyExistsWithNameException } from '../exceptions/product-already-exists-with-name-exception';
import { CategoryNotFoundException } from '../exceptions/category-not-found-by-exception';

@Injectable()
export class ProductService {
  constructor(
    private readonly entityManager: EntityManager,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async addProduct(dto: AddProductDto): Promise<void> {
    const queryRunner = this.entityManager.connection.createQueryRunner();

    await queryRunner.startTransaction();

    try {
      const category = await queryRunner.manager.findOneBy(Category, {
        name: dto.categoryName.trim(),
      });
      if (category === null) {
        throw new CategoryNotFoundException(dto.categoryName);
      }

      const productFound = await this.entityManager.findOneBy(Product, {
        name: dto.name.trim(),
      });
      if (productFound !== null) {
        throw new ProductAlreadyExistsWithNameException(dto.name.trim());
      }

      const product = this.entityManager.create(Product, {
        name: dto.name,
        description: dto.description,
        stock: dto.stock,
        price: dto.price,
        imageUrl: dto.imageUrl,
        category: category,
        createdAt: new Date(),
      });

      await queryRunner.manager.save(product);
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async findProducts(): Promise<ProductDto[]> {
    const products = await this.productRepository.find({
      relations: {
        category: true,
      },
    });
    return products.map(
      (product) =>
        ({
          id: product.id,
          name: product.name,
          description: product.description,
          stock: product.stock,
          price: product.price,
          imageUrl: product.imageUrl,
          createdAt: product.createdAt,
          updatedAt: product.updatedAt,
          category: {
            id: product.category.id,
            name: product.name,
          },
        }) as ProductDto,
    );
  }
}
