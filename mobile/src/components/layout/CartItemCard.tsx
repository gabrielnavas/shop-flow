import React from "react"
import { Image, Pressable, StyleSheet, Text, View } from "react-native"

import { Input } from "../ui/Input"
import { Button } from "../ui/Button"

import { CartItem } from "@/src/contexts/CartContext/CartContext"
import { distanceFrom } from "@/src/utils/date"
import { transformToMoney } from "@/src/utils/money-transform"
import { useCart } from "@/src/hooks/useCart"
import { useTheme } from "@/src/hooks/useTheme"
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome"
import FeatherIcon from "react-native-vector-icons/Feather"
import { CartService } from "@/src/services/cart-service"
import { useAuth } from "@/src/hooks/useAuth"
import { ErrorList } from "../ui/ErrorList"
import { ErrorItem } from "../ui/ErrorItem"
import { OrderService } from "@/src/services/order-service"
import LoadingIcon from "../ui/LoadingIcon"


type Props = {
  cartItem: CartItem
  disabled: boolean
}

export const CartItemCard = ({ cartItem, disabled }: Props) => {
  const { theme } = useTheme()
  const { accessToken, isAuthenticated } = useAuth()

  const [imageUrl, setImageUrl] = React.useState(cartItem.product.imageUrl)
  const [showActionsModal, setShowActionsModal] = React.useState<boolean>(false);
  const [globalError, setGlobalError] = React.useState<string>('')
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const buttonDisabled = isLoading || disabled

  const {
    incrementQuantityItem,
    decrementQuantityItem,
    removeItem,
  } = useCart()

  const incrementQuantityItemOnPress = React.useCallback(async (productId: number) => {
    try {
      setIsLoading(true)
      const quantity = 1
      if(isAuthenticated) {
        const cartService = new CartService(accessToken)
        await cartService.incrementQuantityItem(productId, quantity)
      }
      incrementQuantityItem(productId, quantity)
    } catch (err) {
      if (err instanceof Error) {
        setGlobalError(err.message)
      } else {
        setGlobalError('Tente novamente mais tarde')
      }
    } finally {
      setIsLoading(false)
    }
  }, [])

  const decrementQuantityItemOnPress = React.useCallback(async (productId: number) => {
    try {
      setIsLoading(true)
      const quantity = 1
      if(isAuthenticated) { 
        const cartService = new CartService(accessToken)
        await cartService.decrementQuantityItem(productId, quantity)
      }
      decrementQuantityItem(productId, quantity)
    } catch (err) {
      if (err instanceof Error) {
        setGlobalError(err.message)
      } else {
        setGlobalError('Tente novamente mais tarde')
      }
    } finally {
      setIsLoading(false)
    }
  }, [])

  const removeItemOnPress = React.useCallback(async (productId: number) => {
    try {
      setIsLoading(true)
      const cartService = new CartService(accessToken)
      await cartService.removeItem(productId)
      removeItem(productId)
      setShowActionsModal(false)
    } catch (err) {
      if (err instanceof Error) {
        setGlobalError(err.message)
      } else {
        setGlobalError('Tente novamente mais tarde')
      }
    } finally {
      setIsLoading(false)
    }
  }, [])

  return (
    <Pressable style={[styles.card, {
      backgroundColor: theme.colors.cardBackground,
      borderRadius: theme.borderRadius.default,
      padding: theme.spacing.lg,
      marginHorizontal: theme.spacing.lg,
      gap: theme.spacing.lg,
    }]}>
      <View style={styles.cartInfoContainer}>
        <View style={styles.left}>
          <Image
            source={imageUrl ? { uri: imageUrl } : require('../../../assets/images/no-image.jpg')}
            style={styles.image}
            resizeMode="contain"
            onError={() => setImageUrl('')}
          />
        </View>
        <View style={[styles.middle, {
          gap: theme.spacing.xs,
          padding: theme.spacing.sm,
        }]}>
          <View style={styles.productNameAndPriceContainer}>
            <Text style={[styles.productName, {
              fontSize: theme.fontSizes.medium
            }]}>
              {cartItem.product.name}
            </Text>
            <Text style={styles.cartItemUnitTotalPrice}>
              {transformToMoney((cartItem.quantity * cartItem.product.price).toFixed(2))}
            </Text>
          </View>
          <View>
            <Text style={[styles.cartItemCreated, {
              fontSize: theme.fontSizes.small
            }]}>
              {'Adicionado no carrinho'} {distanceFrom(cartItem.createdAt)}
            </Text>
          </View>
        </View>
        <View style={styles.right}>
          <Button
            disabled={buttonDisabled}
            variant="primary"
            icon={<FeatherIcon name='plus' size={theme.fontSizes.medium} color={theme.colors.icon} />}
            style={[styles.quantityButton]}
            onPress={() => incrementQuantityItemOnPress(cartItem.product.id)} />
          <Input
            textAlign='center'
            editable={false}
            style={[styles.quantityInput, {
              fontSize: theme.fontSizes.large
            }]}
            value={cartItem.quantity.toString()} />
          <Button
            disabled={buttonDisabled}
            variant="primary"
            icon={<FeatherIcon name='minus' size={theme.fontSizes.medium} color={theme.colors.icon} />}
            style={[styles.quantityButton]}
            onPress={() => decrementQuantityItemOnPress(cartItem.product.id)} />
        </View>
      </View>
      {!!globalError && (
        <ErrorList>
          <ErrorItem>
            {globalError}
          </ErrorItem>
        </ErrorList>
      )}
      <View style={[styles.cartActionContainer, {
        gap: theme.spacing.xs,
      }]}>
        {showActionsModal ? (
          <>
            <Button
              disabled={buttonDisabled}
              variant="primary"
              title="Confirmar"
              icon={
                buttonDisabled ? (
                  <LoadingIcon color={theme.colors.darkIcon} />
                ) : (
                  <FontAwesomeIcon name='trash-o' size={theme.fontSizes.large} color={theme.colors.icon} />
                )}
              style={[styles.removeButton, {
                paddingVertical: theme.spacing.lg,
                flexDirection: 'row',
                gap: theme.spacing.lg,
              }]}
              onPress={() => removeItemOnPress(cartItem.product.id)} />
            <Button
              disabled={buttonDisabled}
              variant="cancel"
              title="Cancelar"
              icon={
                buttonDisabled ? (
                  <LoadingIcon color={theme.colors.darkIcon} />
                ) : (
                  <FontAwesomeIcon name='close' size={theme.fontSizes.large} color={theme.colors.icon} />
                )}
              style={[styles.removeButton, {
                paddingVertical: theme.spacing.lg,
                flexDirection: 'row',
                gap: theme.spacing.lg,
              }]}
              onPress={() => setShowActionsModal(false)} />
          </>
        ) : (
          <Button
            disabled={buttonDisabled}
            variant="error"
            title="Remover"
            icon={
              buttonDisabled ? (
                <LoadingIcon color={theme.colors.darkIcon} />
              ) : (
                <FontAwesomeIcon name='trash-o' size={theme.fontSizes.large} color={theme.colors.icon} />
              )
            }
            style={[styles.removeButton, {
              paddingVertical: theme.spacing.md,
              flexDirection: 'row',
              gap: theme.spacing.lg,
            }]}
            onPress={() => setShowActionsModal(true)} />
        )}
      </View>
    </Pressable>
  )
}


const styles = StyleSheet.create({
  card: {
    borderColor: '#0000',
    borderWidth: 1,
  },
  cartInfoContainer: {
    flexDirection: 'row',
  },
  left: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  middle: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  right: {
    alignItems: 'center',
    width: 45,
    gap: 2,
  },
  image: {
    width: 115,
    height: 115,
  },
  productNameAndPriceContainer: {
    flex: 1,
  },
  productName: {
    fontWeight: 'bold',
  },
  cartItemCreated: {
    fontWeight: '300',
    fontStyle: 'italic',
  },
  cartItemUnitTotalPrice: {
  },
  quantityInput: {
    width: '100%',
    fontWeight: 'bold',
    borderWidth: 0,
  },
  quantityButton: {
    width: '100%',
  },
  removeButton: {
    paddingHorizontal: 50,
  },
  cartActionContainer: {
  },
})