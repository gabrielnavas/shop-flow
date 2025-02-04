import React, { useEffect } from "react"
import { ProductCart } from "../../pages/ProductCatalog/types"
import { CartService } from "../../services/cart-service"
import { AuthContext, AuthContextType } from "../AuthContext/AuthContext"
import { CartContext } from "./CartContext"
import { Product } from "../../services/entities"


type Props = {
  children: React.ReactNode
}

const localStorageKeys = {
  cartItems: 'cart-items',
}

export const CartProvider = ({ children }: Props) => {
  const [items, setItems] = React.useState<ProductCart[]>([])
  const [globalError, setGlobalError] = React.useState<string>('')

  const { accessToken, isAuthencated } = React.useContext(AuthContext) as AuthContextType

  useEffect(() => {
    async function fetchCartItemsWithoutAuth() {
      const itemsJson = localStorage.getItem(localStorageKeys.cartItems)
      if (itemsJson) {
        setItems(JSON.parse(itemsJson))
      }
    }

    async function fetchCartItemsWithAuth() {
      if (!isAuthencated) {
        return
      }

      const cartService = new CartService(accessToken)
      const cartItems = await cartService.fetchCartItems()
      // const mergedCartItems = mergeCartItems(cartItems, items)

      // const promises = mergedCartItems.map(async item => (
      //   await cartService.addProductToCart(item.product)
      // ))
      // await Promise.all(promises)

      setItems(cartItems)
      localStorage.setItem(localStorageKeys.cartItems, JSON.stringify(cartItems))
    }


    // IDEIA: sempre busco localmente, pois não precisa de autenticação
    // SEM autenticação: busca o items sem autenticação
    // COM autenticação: busca o items com autenticação, caso tiver logado
    // Resolver isso mais pra frente. problema quando dar refresh, estava incrementando a quantidade de produto.
    fetchCartItemsWithoutAuth()
    fetchCartItemsWithAuth()
  }, [accessToken, isAuthencated,])

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

  const incrementQuantityItem = async (productId: number, quantityIncrement: number): Promise<void> => {
    const cartService = new CartService(accessToken)
    cartService.incrementQuantityItem(productId, quantityIncrement)
      .then(() => {
        const index = items.findIndex(item => item.product.id === productId)
        if (index < 0) {
          return
        }
        const newItems = [...items]
        newItems[index].quantity += quantityIncrement
        setItems(newItems)
        localStorage.setItem(localStorageKeys.cartItems, JSON.stringify(newItems))
      })
      .catch((err) => {
        if (err instanceof Error) {
          setGlobalError(err.message)
        } else {
          setGlobalError('Tente novamente mais tarde.')
        }
      })
  }
  const decrementQuantityItem = async (productId: number, quantityIncrement: number): Promise<void> => {
    const index = items.findIndex(item => item.product.id === productId)
    if (index < 0) {
      return
    }
    const newItems = [...items]
    newItems[index].quantity -= quantityIncrement

    // const cartService = new CartService(accessToken)
    // await cartService.decrementQuantityItem(productId, quantityIncrement)

    setItems(newItems)
    localStorage.setItem(localStorageKeys.cartItems, JSON.stringify(newItems))
  }

  const removeItem = async (productId: number): Promise<void> => {
    const index = items.findIndex(item => item.product.id === productId)
    if (index < 0) {
      return
    }
    const newItems = items.slice(index, 1)

    // const cartService = new CartService(accessToken)
    // await cartService.removeItem(productId)

    setItems(newItems)
    localStorage.setItem(localStorageKeys.cartItems, JSON.stringify(newItems))
  }

  return (
    <CartContext.Provider value={{
      items,
      globalError,
      addItemCart,
      existsProduct,
      incrementQuantityItem,
      decrementQuantityItem,
      removeItem,
    }}>
      {children}
    </CartContext.Provider>
  )
}