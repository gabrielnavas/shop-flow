import React from "react"
import { Product } from "../../services/entities"

export type ProductContextType = {
  items: Product[]
  addProduct: (product: Product) => void
  removerProduct: (productId: number) => void
  updateProduct: (productId: number, product: Product) => void
  isLoading: boolean
  globalError: string
}

export const ProductContext = React.createContext<ProductContextType | null>(null)