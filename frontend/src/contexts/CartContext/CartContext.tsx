import React, { useEffect } from "react"
import { Product, ProductCart } from "../../Product/types"
import { CartService } from "../../Product/services/cart-service"
import { AuthContext, AuthContextType } from "../AuthContext/AuthContext"
import { mergeCartItems } from "./functions"

export type CartContextType = {
  items: ProductCart[]
  addItemCart: (product: Product) => void
  existsProduct: (product: Product) => boolean
}

export const CartContext = React.createContext<CartContextType | null>(null)

type Props = {
  children: React.ReactNode
}

const localStorageKeys = {
  cartItems: 'cart-items',
}

export const CartProvider = ({ children }: Props) => {
  const [items, setItems] = React.useState<ProductCart[]>([])

  const { accessToken, isAuthencated } = React.useContext(AuthContext) as AuthContextType

  useEffect(() => {
    function localStorageLoadItems() {
      const itemsJson = localStorage.getItem(localStorageKeys.cartItems)
      if (itemsJson) {
        setItems(JSON.parse(itemsJson))
      }
    }
    localStorageLoadItems()
  }, [])

  useEffect(() => {
    async function fetchCartItems() {
      if (!isAuthencated) {
        return
      }

      const cartService = new CartService(accessToken)
      const cartItems = await cartService.fetchCartItems()
      const mergedCartItems = mergeCartItems(cartItems, items)

      const promises = mergedCartItems.map(async item => (
        await cartService.addProductToCart(item.product)

      ))
      await  Promise.all(promises)

      setItems(mergedCartItems)
      localStorage.setItem(localStorageKeys.cartItems, JSON.stringify(mergedCartItems))
    }
    fetchCartItems()
  }, [accessToken, isAuthencated, items])

  const addItemCart = React.useCallback((product: Product): void => {
    const productCart = {
      product: product,
      quantity: 1,
    } as ProductCart

    setItems(prev => {
      const updatedItems = [...prev, productCart]
      localStorage.setItem(localStorageKeys.cartItems, JSON.stringify(updatedItems))
      return updatedItems
    })
  }, [])

  const existsProduct = React.useCallback((product: Product): boolean => {
    return items.some(item => product.id === item.product.id)
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