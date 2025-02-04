import React, { useEffect } from "react"
import { ProductCart } from "../../pages/Cart/types"
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
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

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

      setIsLoading(true)
      try {
        const cartService = new CartService(accessToken)
        const cartItems = await cartService.fetchCartItems()
        // const mergedCartItems = mergeCartItems(cartItems, items)

        // const promises = mergedCartItems.map(async item => (
        //   await cartService.addProductToCart(item.product)
        // ))
        // await Promise.all(promises)

        setItems(cartItems)
        localStorage.setItem(localStorageKeys.cartItems, JSON.stringify(cartItems))
      } catch (err) {
        if (err instanceof Error) {
          setGlobalError(err.message)
        } else {
          setGlobalError('Tente novamente mais tarde.')
        }
      } finally {
        setIsLoading(false)
      }
    }


    // IDEIA: sempre busco localmente, pois não precisa de autenticação
    // SEM autenticação: busca o items sem autenticação
    // COM autenticação: busca o items com autenticação, caso tiver logado
    // Resolver isso mais pra frente. problema quando dar refresh, estava incrementando a quantidade de produto.
    fetchCartItemsWithoutAuth()
    fetchCartItemsWithAuth()
  }, [accessToken, isAuthencated,])


  const clearGlobalError = React.useCallback(() => {
    setGlobalError('')
  }, [])


  // TODO: Mover a logica do add item to cart da api da home pra cá
  const addItemCart = React.useCallback((product: Product): void => {
    clearGlobalError()

    if (isAuthencated) {
      setIsLoading(true)
      try {
        const cartService = new CartService(accessToken)
        cartService.addProductToCart(product)
      } catch (err) {
        if (err instanceof Error) {
          setGlobalError(err.message)
        } else {
          setGlobalError('Tente novamente mais tarde.')
        }
      } finally {
        setIsLoading(false)
      }
    }

    const productCart = {
      product: product,
      quantity: 1,
      createdAt: new Date()
    } as ProductCart

    setItems(prev => {
      const updatedItems = [...prev, productCart]
      localStorage.setItem(localStorageKeys.cartItems, JSON.stringify(updatedItems))
      return updatedItems
    })
  }, [clearGlobalError, accessToken, isAuthencated])

  const existsProduct = React.useCallback((product: Product): boolean => {
    return items.some(item => product.id === item.product.id)
  }, [items])

  const incrementQuantityItem = React.useCallback(async (productId: number, quantity: number): Promise<void> => {
    clearGlobalError()

    setIsLoading(true)
    const cartService = new CartService(accessToken)
    cartService.incrementQuantityItem(productId, quantity)
      .then(() => {
        const index = items.findIndex(item => item.product.id === productId)
        if (index < 0) {
          return
        }
        const newItems = [...items]
        newItems[index].quantity += quantity
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
      .finally(() => {
        setIsLoading(false)
      })
  }, [clearGlobalError, accessToken, items])

  const decrementQuantityItem = React.useCallback(async (productId: number, quantity: number): Promise<void> => {
    clearGlobalError()

    setIsLoading(true)
    const cartService = new CartService(accessToken)
    cartService.decrementQuantityItem(productId, quantity)
      .then(() => {
        const index = items.findIndex(item => item.product.id === productId)
        if (index < 0) {
          return
        }
        const newItems = [...items]
        newItems[index].quantity -= quantity
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
      .finally(() => {
        setIsLoading(false)
      })
  }, [accessToken, items, clearGlobalError])

  const removeItem = React.useCallback(async (productId: number): Promise<void> => {
    clearGlobalError()

    const cartService = new CartService(accessToken)
    await cartService.removeItem(productId)
      .then(() => {
        const index = items.findIndex(item => item.product.id === productId)
        if (index < 0) {
          return
        }
        const newItems = [...items]
        newItems.splice(index, 1)
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
      .finally(() => {
        setIsLoading(false)
      })
  }, [accessToken, items, clearGlobalError])

  return (
    <CartContext.Provider value={{
      items,
      globalError,
      clearGlobalError,
      isLoading,
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