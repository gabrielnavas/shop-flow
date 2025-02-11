import { ProductDto } from 'src/product/dtos';

export type AddItemToCart = {
  productId: number;
  quantity: number;
};

export type CartItemDto = {
  product: ProductDto;
  quantity: number;
  createdAt: Date;
};

export type QuantityItemBody = {
  productId: number;
  quantity: number;
};
