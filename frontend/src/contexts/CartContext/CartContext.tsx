import React from "react"
import { ProductCart } from "../../pages/ProductCatalog/types"
import { Product } from "../../services/product-service"

export type CartContextType = {
  items: ProductCart[]
  addItemCart: (product: Product) => void
  existsProduct: (product: Product) => boolean
}

export const CartContext = React.createContext<CartContextType | null>(null)