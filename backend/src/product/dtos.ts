export type AddProductDto = {
  name: string;
  description: string;
  stock: number;
  price: number;
  imageUrl: string;
  categoryName: string;
};

export type ProductDto = {
  id: number;
  name: string;
  description: string;
  stock: number;
  price: number;
  imageUrl: string;
  createdAt: Date;
  updatedAt?: Date;
  category: {
    id: number;
    name: string;
  };
};
