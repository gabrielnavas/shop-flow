import React from "react"
import { Product, ProductCart } from "../Product/types"

export type CartContextType = {
  items: ProductCart[]
  addItemCart: (product: Product) => void
}

export const CartContext = React.createContext<CartContextType | null>(null)

type Props = {
  children: React.ReactNode
}

export const CartProvider = ({ children }: Props) => {
  const [items, setItems] = React.useState<ProductCart[]>([])

  const addItemCart = React.useCallback((product: Product) => {
    const productCart = {
      product: product,
      quantity: 1,
    } as ProductCart
    
    setItems(prev => [...prev, productCart])
  }, [])

  return (
    <CartContext.Provider value={{
      items,
      addItemCart
    }}>
      {children}
    </CartContext.Provider>
  )
}