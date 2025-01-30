import { Product, ProductCart } from "../pages/ProductCatalog/types";

export class CartService {
  constructor(
    private accessToken: string,
    private urlEndpoint: string = import.meta.env.VITE_API_ENDPOINT
  ) { }

  async addProductToCart(product: Product, quantity: number = 1): Promise<void> {
    const payload = {
      productId: product.id,
      quantity: quantity,
    }
    const url = `${this.urlEndpoint}/cart-item`

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json',
          'Authorization': `Bearer ${this.accessToken}`
        },
        body: JSON.stringify(payload)
      })
      if (response.status >= 400) {
        const { message } = await response.json()
        throw new Error(message)
      }

    } catch (err) {
      if ((err as Error).name === 'TypeError' && (err as Error).message === 'Failed to fetch') {
        throw new Error('Servidor offline.')
      }

      throw err
    }
  }


  async fetchCartItems(): Promise<ProductCart[]> {
    const url = `${this.urlEndpoint}/cart-item`
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'accept': 'application/json',
        'Authorization': `Bearer ${this.accessToken}`
      },
    })
    if (response.status >= 400) {
      const { message } = await response.json()
      throw new Error(message)
    }
    const cartItems = await response.json()
    return cartItems
  }
}