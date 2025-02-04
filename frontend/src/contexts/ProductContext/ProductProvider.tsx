import React from "react"
import { ProductService } from "../../services/product-service"
import { ProductContext } from "./ProductContext"
import { Product } from "../../services/entities"

type Props = {
  children: React.ReactNode
}

export const ProductProvider = ({ children }: Props) => {
  const [items, setItems] = React.useState<Product[]>([])
  const [isLoading, setIsLoading] = React.useState(false)
  const [globalError, setGlobalError] = React.useState('')


  React.useEffect(() => {
    async function fetchProducts() {
      setIsLoading(true)
      try {
        const productService = new ProductService()
        const products = await productService.findProducts()
        setItems(products)
      } catch (err) {
        if (err instanceof Error) {
          setGlobalError(err.message)
        } else {
          setGlobalError('Tente novamente mais tarde.')
        }
      }

      setIsLoading(false)

    }
    fetchProducts()
  }, [])

  const addProduct = React.useCallback((product: Product) => {
    setItems(prev => [{ ...product }, ...prev])
  }, [])

  const removerProduct = React.useCallback((productId: number) => {
    setItems(prev => prev.filter(product => product.id !== productId))
  }, [])

  const removerProducts = React.useCallback((productIds: number[]) => {
    setItems(prev => prev.filter(product => {
      const found = productIds.some(productId => product.id === productId)
      return !found
    }))
  }, [])

  const updateProduct = React.useCallback((productId: number, product: Product) => {
    setItems(prev => {
      const indexDelete = prev.findIndex(p => p.id === productId)
      if (indexDelete < 0) {
        return prev
      }

      const newItems = [...prev]
      const newProduct = {...newItems[indexDelete]}

      newProduct.name = product.name
      newProduct.description = product.description
      newProduct.category = product.category
      newProduct.updatedAt = product.updatedAt
      newProduct.stock = product.stock
      newProduct.price = product.price
      newProduct.imageUrl = product.imageUrl

      const countItemsToDelete = 1
      newItems.splice(indexDelete, countItemsToDelete, newProduct)

      return newItems
    })
  }, [])

  return (
    <ProductContext.Provider value={{
      addProduct,
      removerProduct,
      removerProducts,
      updateProduct,
      items,
      isLoading,
      globalError,
    }}>
      {children}
    </ProductContext.Provider>
  )
}