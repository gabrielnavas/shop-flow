import { ProductDto } from 'src/product/dtos';

export type AddProductToCartDto = {
  productId: number;
  quantity: number;
};

export type CartItemDto = {
  product: ProductDto;
  quantity: number;
  createdAt: Date;
};
