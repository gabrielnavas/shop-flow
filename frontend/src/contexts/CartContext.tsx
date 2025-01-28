import React from "react"
import { Product, ProductCart } from "../Product/types"

export type CartContextType = {
  items: ProductCart[]
  addItemCart: (product: Product) => void
  existsProduct: (product: Product) => boolean
}

export const CartContext = React.createContext<CartContextType | null>(null)

type Props = {
  children: React.ReactNode
}

export const CartProvider = ({ children }: Props) => {
  const [items, setItems] = React.useState<ProductCart[]>([])

  const addItemCart = React.useCallback((product: Product): void => {
    const productCart = {
      product: product,
      quantity: 1,
    } as ProductCart
    
    setItems(prev => [...prev, productCart])
  }, [])

  const existsProduct = React.useCallback((product: Product): boolean => {
    return items.some(item => product.id === item.product.id )
  }, [items])

  return (
    <CartContext.Provider value={{
      items,
      addItemCart,
      existsProduct,
    }}>
      {children}
    </CartContext.Provider>
  )
}