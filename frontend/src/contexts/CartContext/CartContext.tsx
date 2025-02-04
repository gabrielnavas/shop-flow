import React from "react"
import { ProductCart } from "../../pages/ProductCatalog/types"
import { Product } from "../../services/entities"

export type CartContextType = {
  items: ProductCart[]
  globalError: string
  addItemCart: (product: Product) => void
  existsProduct: (product: Product) => boolean
  incrementQuantityItem: (productId: number, quantityIncrement: number) => void
  decrementQuantityItem: (productId: number, quantityIncrement: number) => void
  removeItem: (productId: number) => void
}

export const CartContext = React.createContext<CartContextType | null>(null)