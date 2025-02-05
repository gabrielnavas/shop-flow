import { CartItem } from "../contexts/CartContext/CartContext";
import { Product } from "./entities";

type CartItemBody = Omit<CartItem, 'createdAt'> & {
  product: Omit<Product, 'createdAt' & 'updatedAt'> & {
    createdAt: string
    updatedAt?: string
  }
  createdAt: string
}


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


  async fetchCartItems(): Promise<CartItem[]> {
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
    const cartItemsWrapped = cartItems.map((item: CartItemBody) => ({
      product: {
        ...item.product,
        createdAt: new Date(item.product.createdAt),
        updatedAt: item.product.updatedAt ? new Date(item.product.updatedAt) : undefined,
      },
      quantity: item.quantity,
      createdAt: new Date(item.createdAt),
    }))
    return cartItemsWrapped
  }

  async incrementQuantityItem(productId: number, quantity: number) {
    const url = `${this.urlEndpoint}/cart-item/increment-quantity`
    const payload = {
      productId,
      quantity,
    }
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.accessToken}`
      },
      body: JSON.stringify(payload)
    })
    if (response.status >= 400) {
      const { message } = await response.json()
      throw new Error(message)
    }
  }


  async decrementQuantityItem(productId: number, quantity: number) {
    const url = `${this.urlEndpoint}/cart-item/decrement-quantity`
    const payload = {
      productId,
      quantity,
    }
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.accessToken}`
      },
      body: JSON.stringify(payload)
    })
    if (response.status >= 400) {
      const { message } = await response.json()
      throw new Error(message)
    }
  }

  async removeItem(productId: number) {
    const url = `${this.urlEndpoint}/cart-item/product/${productId}`
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.accessToken}`
      },
    })
    if (response.status >= 400) {
      const { message } = await response.json()
      throw new Error(message)
    }
  }
}