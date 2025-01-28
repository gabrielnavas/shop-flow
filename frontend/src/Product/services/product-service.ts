import { Product } from "../types";

type ProductResponseBody = Omit<Product, 'createdAt' | 'updatedAt'> & {
  createdAt: string
  updatedAt: string
}

export class ProductService {
  constructor(
    private urlEndpoint: string = import.meta.env.VITE_API_ENDPOINT,
  ) { }

  async findProducts(): Promise<Product[]> {
    const url = `${this.urlEndpoint}/product`
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        content: 'application/json',
      }
    })
    if (response.status >= 400) {
      const { message } = await response.json()
      throw new Error(message)
    }
    const products = await response.json()
    return products.map((product: ProductResponseBody) => ({
      id: product.id,
      name: product.name,
      imageUrl: product.imageUrl,
      price: product.price,
      stock: product.stock,
      description: product.description,
      category: {
        id: product.category.id,
        name: product.category.name
      },
      createdAt: new Date(product.createdAt),
      updatedAt: product.updatedAt ? new Date(product.updatedAt) : undefined,
    }) as Product)
  }
}
