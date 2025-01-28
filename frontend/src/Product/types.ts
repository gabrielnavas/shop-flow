export type Product = {
  id: number;
  name: string;
  description: string;
  stock: number;
  price: number;
  imageUrl: string;
  createdAt: Date
  updatedAt?: Date
  category: {
    id: number;
    name: string;
  };
}

export type ProductCart = {
  product: Product;
  quantity: number
}