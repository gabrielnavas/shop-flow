import { Dimensions, Image, StyleSheet, Text, View } from "react-native"
import { Button } from "../ui/Button"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { Product } from "@/src/services/entities"
import React from "react"
import { useTheme } from "@/src/hooks/useTheme"
import { useCart } from "@/src/hooks/useCart"
import { CartService } from "@/src/services/cart-service"
import { useAuth } from "@/src/hooks/useAuth"
import LoadingIcon from "../ui/LoadingIcon"
import { ErrorList } from "../ui/ErrorList"
import { ErrorItem } from "../ui/ErrorItem"

type Props = {
  product: Product
}

export const ProductCard = ({ product }: Props) => {

  const [imageUrl, setImageUrl] = React.useState(product.imageUrl)
  const { theme } = useTheme()

  const { accessToken, isAuthenticated } = useAuth()
  const { addItemCart } = useCart()

  const [globalError, setGlobalError] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)

  const addItemCartOnPress = React.useCallback(async (product: Product) => {
    try {
      setIsLoading(true)
      const quantity = 1

      const newItemCart = {
        product,
        quantity,
        createdAt: new Date()
      }
      addItemCart(newItemCart)

      if (isAuthenticated) {
        const cartService = new CartService(accessToken)
        await cartService.addProductToCart(product, quantity)
      }
    } catch (err) {
      if (err instanceof Error) {
        setGlobalError(err.message)
      } else {
        setGlobalError('Tente novamente mais tarde.')
      }
    } finally {
      setIsLoading(false)
    }
  }, [])

  return (
    <View style={styles.container}>
      <View style={[styles.wrapped, {
        gap: theme.spacing.sm,
      }]}>
        <View style={styles.top}>
          <View style={styles.imageContainer}>
            <Image
              source={imageUrl ? { uri: imageUrl } : require('../../../assets/images/no-image.jpg')}
              style={styles.image}
              resizeMode="contain"
              onError={() => setImageUrl('')}
            />
          </View>
        </View>
        <View style={styles.middle}>
          <Text style={[styles.productName, {
            fontSize: theme.fontSizes.medium,
          }]}>
            {product.name}
          </Text>
          <Text style={[styles.productDescription, {
            fontSize: theme.fontSizes.small
          }]}>
            {product.description}
          </Text>
        </View>
        <View style={{
          gap: theme.spacing.sm,
        }}>
          <Text style={[styles.productPrice, {
            fontSize: theme.fontSizes.extraLarge
          }]}>
            {product.price}
          </Text>
          {globalError && (
            <ErrorList>
              <ErrorItem>
                {globalError}
              </ErrorItem>
            </ErrorList>
          )}
          <View style={styles.buttonContainer}>
            <Button
              onPress={() => addItemCartOnPress(product)}
              disabled={isLoading}
              icon={
                isLoading ? (
                  <LoadingIcon color={theme.colors.darkIcon} />
                ) : (
                  <MaterialCommunityIcons
                    size={theme.fontSizes.extraLarge}
                    name="cart-plus"
                    color={theme.colors.icon} />
                )}
            />
          </View>
        </View>
      </View>
    </View >
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  wrapped: {
    width: Dimensions.get('screen').width * .80,
  },
  top: {},
  imageContainer: {
    height: 275, // Defina um tamanho para a imagem
  },
  image: {
    width: "100%",
    height: "100%",
  },
  middle: {},
  productName: {
    fontWeight: '500'
  },
  productDescription: {
    fontWeight: '400'
  },
  bottom: {
  },
  productPrice: {
    fontWeight: 'bold',
  },
  buttonContainer: {},
})