export type Product = {
  id: number;
  name: string;
  description: string;
  stock: number;
  price: number;
  imageUrl: string;
  createdAt: Date
  updatedAt?: Date
  category: Category;
}

export type Category = {
  id: number
  name: string
}
