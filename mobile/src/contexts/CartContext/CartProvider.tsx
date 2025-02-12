import React, { useEffect } from "react"
import { AuthContext, AuthContextType } from "../AuthContext/AuthContext"
import { CartContext, CartItem } from "./CartContext"

import AsyncStorage from "@react-native-async-storage/async-storage"

type Props = {
  children: React.ReactNode
}

const asyncStorageKeys = {
  cartItems: 'cart-items',
}

export const CartProvider = ({ children }: Props) => {
  const [cartItems, setCartItems] = React.useState<CartItem[]>([])
  // const [totalPrice, setTotalPrice] = React.useState<number>(0.00)
  const { accessToken, isAuthenticated } = React.useContext(AuthContext) as AuthContextType

  useEffect(() => {
    async function fetchLocalCartItems() {
      const itemsJson = await AsyncStorage.getItem(asyncStorageKeys.cartItems)
      if (itemsJson !== null) {
        setCartItems(JSON.parse(itemsJson))
      }
    }
    fetchLocalCartItems()
  }, [accessToken, isAuthenticated,])

  // React.useEffect(() => {
  //   const totalPrice = cartItems.reduce((acc, item) => acc + item.quantity * item.product.price, 0)
  //   setTotalPrice(totalPrice)
  // }, [cartItems])

  const addItemCart = React.useCallback((cartItem: CartItem): void => {
    setCartItems(prev => {
      const updatedItems = [...prev, cartItem];
      (async () => {
        await AsyncStorage.setItem(asyncStorageKeys.cartItems, JSON.stringify(updatedItems))
      })()
      return updatedItems
    })
  }, [])

  // const existsProduct = React.useCallback((product: Product): boolean => {
  //   return cartItems.some(item => product.id === item.product.id)
  // }, [cartItems])

  const incrementQuantityItem = React.useCallback(async (productId: number, quantity: number): Promise<void> => {
    setCartItems(cartItems => {
      const index = cartItems.findIndex(item => item.product.id === productId)
      if (index < 0) {
        return cartItems
      }
      const newItems = [...cartItems]
      newItems[index].quantity += quantity;
      (async () => {
        await AsyncStorage.setItem(asyncStorageKeys.cartItems, JSON.stringify(newItems))
      })()
      return newItems
    })
  }, [])

  const decrementQuantityItem = React.useCallback(async (productId: number, quantity: number): Promise<void> => {
    setCartItems(cartItems => {
      const index = cartItems.findIndex(item => item.product.id === productId)
      if (index < 0) {
        return cartItems
      }
      const newItems = [...cartItems]
      newItems[index].quantity -= quantity;
      (async () => {
        await AsyncStorage.setItem(asyncStorageKeys.cartItems, JSON.stringify(newItems))
      })()
      return newItems
    })
  }, [])

  const removeItem = React.useCallback(async (productId: number): Promise<void> => {
    setCartItems(cartItems => {
      const index = cartItems.findIndex(item => item.product.id === productId)
      if (index < 0) {
        return cartItems
      }
      const newItems = [...cartItems]
      newItems.splice(index, 1);
      (async () => {
        await AsyncStorage.setItem(asyncStorageKeys.cartItems, JSON.stringify(newItems))
      })()
      return newItems
    })
  }, [])

  // const clearCart = React.useCallback(() => {
  //     setCartItems([])
  // }, [])

  return (
    <CartContext.Provider value={{
      // totalPrice,
      cartItems,
      setCartItems,
      // clearCart,
      addItemCart,
      // existsProduct,
      incrementQuantityItem,
      decrementQuantityItem,
      removeItem,
    }}>
      {children}
    </CartContext.Provider>
  )
}