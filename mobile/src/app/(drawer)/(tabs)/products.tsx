import React from "react"
import { Dimensions } from "react-native"

import { FlatList, StyleSheet, Text, View } from "react-native"

import { ProductCard } from "@/src/components/layout/ProductCard"
import { Product } from "@/src/services/entities"
import { ProductService } from "@/src/services/product-service"
import { ErrorList } from "@/src/components/ui/ErrorList"
import { ErrorItem } from "@/src/components/ui/ErrorItem"
import LoadingIcon from "@/src/components/ui/LoadingIcon"

export default function ProductScreen() {
  const [products, setProducts] = React.useState<Product[]>([])
  const [isLoading, setIsLoading] = React.useState<boolean>(true)
  const [globalError, setGlobalError] = React.useState<string>('')

  React.useEffect(() => {
    async function fetchProducts() {
      try {
        setIsLoading(true)
        const productService = new ProductService()
        const products = await productService.findProducts()
        setProducts(products)
      } catch (err) {
        if (err instanceof Error) {
          setGlobalError(err.message)
        } else {
          setGlobalError('Ocorreu um problema.')
        }
      } finally {
        setIsLoading(false)
      }
    }
    fetchProducts()
  }, [])

  return (
    <View style={styles.container}>
      {!!globalError && (
        <ErrorList>
          <ErrorItem>{globalError}</ErrorItem>
        </ErrorList>
      )}
      {isLoading && (
        <View style={styles.loadingView}>
          <LoadingIcon size={40} />
        </View>
      )}
      <FlatList
        style={styles.productList}
        data={products}
        renderItem={({ item }) => <ProductCard product={item} />}
        ListEmptyComponent={<ProductEmptyList />}
        ItemSeparatorComponent={() => <View style={{ height: 40 }} />}
      />
    </View>
  )
}

const ProductEmptyList = () => {
  return (
    <View style={{
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <Text style={{
        fontWeight: 'bold',
        fontSize: 18,
      }}>
        Nenhum produto encontrado
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  productList: {
    width: Dimensions.get('screen').width,
    paddingVertical: 20,
  },
  loadingView: {
    alignContent: 'center',
    justifyContent: 'center',
    padding: 5,
  }
})