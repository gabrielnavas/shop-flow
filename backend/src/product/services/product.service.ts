import { Injectable } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import {
  AddProductDto,
  ProductDto,
  RemoveProductsDto,
  UpdateProductDto,
} from '../dtos';
import { Category } from 'src/entities/category.entity';
import { Product } from 'src/entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductAlreadyExistsWithNameException } from '../exceptions/product-already-exists-with-name-exception';
import { CategoryNotFoundException } from '../exceptions/category-not-found-by-exception';
import { ProductNotFoundException } from '../exceptions/product-not-found-by-exception';

@Injectable()
export class ProductService {
  constructor(
    private readonly entityManager: EntityManager,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async addProduct(dto: AddProductDto): Promise<ProductDto> {
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

      return this.mapEntityToDto(product);
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
      order: {
        createdAt: 'DESC',
        updatedAt: 'DESC',
      },
    });
    const productsMapped = products.map((product) =>
      this.mapEntityToDto(product),
    );
    return productsMapped;
  }

  async findProductById(productId: number): Promise<ProductDto> {
    const product = await this.productRepository.findOne({
      where: { id: productId },
      relations: {
        category: true,
      },
    });
    if (!product) {
      throw new ProductNotFoundException();
    }
    return this.mapEntityToDto(product);
  }

  async updateProduct(
    productId: number,
    dto: UpdateProductDto,
  ): Promise<ProductDto> {
    const category = await this.categoryRepository.findOneBy({
      name: dto.categoryName,
    });
    if (!category) {
      throw new CategoryNotFoundException(dto.categoryName);
    }
    await this.productRepository.update(productId, {
      name: dto.name,
      description: dto.description,
      stock: dto.stock,
      price: dto.price,
      imageUrl: dto.imageUrl,
      category: category,
      updatedAt: new Date(),
    });
    return await this.findProductById(productId);
  }

  async removeProduct(productId: number) {
    const productFound = await this.productRepository.findOneBy({
      id: productId,
    });
    if (productFound === null) {
      throw new ProductNotFoundException();
    }
    await this.productRepository.delete({
      id: productFound.id,
    });
  }

  async removeProducts(dto: RemoveProductsDto) {
    const queryRunner = this.entityManager.connection.createQueryRunner();
    await queryRunner.startTransaction();

    try {
      const promises = dto.productIds.map(async (productId: number) => {
        const productFound = await queryRunner.manager.findOneBy(Product, {
          id: productId,
        });
        if (productFound === null) {
          throw new ProductNotFoundException();
        }
        return queryRunner.manager.delete(Product, {
          id: productFound.id,
        });
      });
      await Promise.all(promises);
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  private mapEntityToDto(entity: Product): ProductDto {
    return {
      id: entity.id,
      name: entity.name,
      description: entity.description,
      stock: Number(entity.stock),
      price: Number(entity.price),
      imageUrl: entity.imageUrl,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      category: {
        id: entity.category.id,
        name: entity.category.name,
      },
    };
  }
}
