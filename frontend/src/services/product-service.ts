import { Product } from "./entities";


export type AddNewProduct = {
  name: string;
  description: string;
  stock: number;
  price: number;
  categoryName: string;
}

type BodyProduct = Omit<Product, 'createdAt' | 'updatedAt'> & {
  createdAt: string
  updatedAt: string
}

export class ProductService {


  constructor(
    private accessToken?: string,
    private urlEndpoint: string = `${import.meta.env.VITE_API_ENDPOINT}/product`,
  ) { }

  async findProducts(): Promise<Product[]> {
    try {
      const response = await fetch(this.urlEndpoint, {
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
      return products.map(this.mapBodyToProduct)
    } catch (err) {
      if ((err as Error).name === 'TypeError' && (err as Error).message === 'Failed to fetch') {
        throw new Error('Servidor offline.')
      }

      throw new Error('Tente novamente mais tarde.')
    }
  }

  async addProduct(product: AddNewProduct): Promise<Product> {
    if (!this.accessToken) {
      throw new Error('Você não tem permissão')
    }
    const payload = {
      name: product.name,
      description: product.description,
      stock: product.stock,
      price: product.price,
      categoryName: product.categoryName,
    }
    const response = await fetch(this.urlEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        content: 'application/json',
        'Authorization': `Bearer ${this.accessToken}`
      },
      body: JSON.stringify(payload)
    })
    if (response.status >= 400) {
      const { message } = await response.json()
      throw new Error(message)
    }
    try {
      const productBody = await response.json()
      const productResponse = this.mapBodyToProduct(productBody)
      return productResponse
    } catch (err) {
      if ((err as Error).name === 'TypeError' && (err as Error).message === 'Failed to fetch') {
        throw new Error('Servidor offline.')
      }

      throw new Error('Tente novamente mais tarde.')
    }
  }

  async updateProduct(productId: number, product: AddNewProduct): Promise<Product> {
    if (!this.accessToken) {
      throw new Error('Você não tem permissão')
    }
    const payload = {
      name: String(product.name),
      description: String(product.description),
      stock: Number(product.stock),
      price: Number(product.price),
      categoryName: String(product.categoryName),
    }
    try {
      const url = `${this.urlEndpoint}/${productId}`
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          content: 'application/json',
          'Authorization': `Bearer ${this.accessToken}`
        },
        body: JSON.stringify(payload)
      })
      if (response.status >= 400) {
        const { message } = await response.json()
        throw new Error(message)
      }
      const productUpdated = await response.json()
      return productUpdated

    } catch (err) {
      if ((err as Error).name === 'TypeError' && (err as Error).message === 'Failed to fetch') {
        throw new Error('Servidor offline.')
      }

      throw new Error('Tente novamente mais tarde.')
    }
  }

  async updateImageProduct(productId: number, file: File) {
    try {
      const formdata = new FormData();
      formdata.append("file", file, file.name);

      const requestOptions = {
        method: "PUT",
        body: formdata,
        headers: {
          'Authorization': `Bearer ${this.accessToken}`
        },
      };

      const urlEndpoint = `${this.urlEndpoint}/${productId}/image`
      const response = await fetch(urlEndpoint, requestOptions)
      if (response.status >= 400) {
        const { message } = await response.json()
        throw new Error(message)
      }
      const { url } = await response.json()
      return {
        url
      }
    } catch (err) {
      if ((err as Error).name === 'TypeError' && (err as Error).message === 'Failed to fetch') {
        throw new Error('Servidor offline.')
      }

      throw new Error('Tente novamente mais tarde.')
    }
  }

  async removeProduct(product: Product) {
    if (!this.accessToken) {
      throw new Error('Você não tem permissão')
    }
    const url = `${this.urlEndpoint}/${product.id}`
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${this.accessToken}`
      },
    })
    if (response.status >= 400) {
      const { message } = await response.json()
      throw new Error(message)
    }
  }

  async removeProducts(products: Product[]) {
    if (!this.accessToken) {
      throw new Error('Você não tem permissão')
    }
    const ids = products.map(p => p.id).join(',');
    const url = `${this.urlEndpoint}?productIds=${ids}`;
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${this.accessToken}`
      },
    })
    if (response.status >= 400) {
      const { message } = await response.json()
      throw new Error(message)
    }
  }


  private mapBodyToProduct(body: BodyProduct): Product {
    return ({
      id: body.id,
      name: body.name,
      imageUrl: body.imageUrl,
      price: body.price,
      stock: body.stock,
      description: body.description,
      category: {
        id: body.category.id,
        name: body.category.name
      },
      createdAt: new Date(body.createdAt),
      updatedAt: body.updatedAt ? new Date(body.updatedAt) : undefined,
    }) as Product
  }
}
