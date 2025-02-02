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

  const updateProduct = React.useCallback((productId: number, product: Product) => {
    setItems(prev => {
      const index = prev.findIndex(product => product.id !== productId)
      if (index < 0) {
        return prev
      }
      const productFound = items[index]
  
      productFound.name = product.name
      productFound.description = product.description
      productFound.category = product.category
      productFound.updatedAt = product.updatedAt
      productFound.stock = product.stock
      productFound.price = product.price

      const newItems = [...prev]
      newItems[index] = productFound
      return newItems
    })
  }, [items])

  return (
    <ProductContext.Provider value={{
      addProduct,
      removerProduct,
      updateProduct,
      items,
      isLoading,
      globalError,
    }}>
      {children}
    </ProductContext.Provider>
  )
}