import React from "react"
import { Product, ProductCart } from "../../pages/ProductCatalog/types"

export type CartContextType = {
  items: ProductCart[]
  addItemCart: (product: Product) => void
  existsProduct: (product: Product) => boolean
}

export const CartContext = React.createContext<CartContextType | null>(null)