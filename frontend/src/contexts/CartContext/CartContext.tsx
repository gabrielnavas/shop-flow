import React from "react"
import { Product } from "../../services/entities"

export type CartItem = {
  product: Product
  quantity: number
  createdAt: Date
}

export type CartContextType = {
  items: CartItem[]
  globalError: string
  clearGlobalError: () => void
  isLoading: boolean
  addItemCart: (product: Product) => void
  existsProduct: (product: Product) => boolean
  incrementQuantityItem: (productId: number, quantityIncrement: number) => void
  decrementQuantityItem: (productId: number, quantityIncrement: number) => void
  removeItem: (productId: number) => void
}

export const CartContext = React.createContext<CartContextType | null>(null)