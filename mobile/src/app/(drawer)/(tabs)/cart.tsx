import React from "react";
import { Alert, FlatList, StyleSheet, Text, View } from "react-native";

import { Button } from "@/src/components/ui/Button";
import { CartItemCard } from "@/src/components/layout/CartItemCard";
import { useAuth } from "@/src/hooks/useAuth";
import { useCart } from "@/src/hooks/useCart";
import { useTheme } from "@/src/hooks/useTheme";
import { CartService } from "@/src/services/cart-service";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { transformToMoney } from "@/src/utils/money-transform";
import { OrderService } from "@/src/services/order-service";
import { ErrorList } from "@/src/components/ui/ErrorList";
import { ErrorItem } from "@/src/components/ui/ErrorItem";
import LoadingIcon from "@/src/components/ui/LoadingIcon";
import EntypoIcons from "react-native-vector-icons/Entypo";
import { router } from "expo-router";

export default function CartScreen() {

  const { setCartItems, cartItems } = useCart()
  const { isAuthenticated, accessToken } = useAuth()

  const [globalError, setGlobalError] = React.useState<string>('')
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const { theme } = useTheme()

  React.useEffect(() => {
    async function fetchCartItems() {
      if (isAuthenticated) {
        const cartService = new CartService(accessToken)
        const cartItems = await cartService.fetchCartItems()
        debugger
        setCartItems(cartItems)
      }
    }
    fetchCartItems()
      .catch(err => {
        if(err instanceof Error) {
          setGlobalError(err.message)
        } else {
          setGlobalError('Não foi possível obter os itens do carrinho')
        } 
      })
  }, [])

  const totalQuantity = cartItems.reduce((tot, item) => tot + item.quantity, 0)
  const totalPrice = cartItems.reduce((tot, item) => {
    debugger
    const total = tot + (item.quantity * item.product.price)
    return total
  }, 0)

  const onSubmitOnPress = React.useCallback(async () => {
    if(!isAuthenticated) {
      Alert.alert('Atenção', 'Você precisa estar logado pra finalizar o pedido', [{
        text: "Entrar",
        onPress: () => router.replace('/(drawer)/signin'),
        style: "default"
      }, {
        text: 'Fechar',
        style: "destructive"
      }])
      return
    }
    try {
      setIsLoading(true)
      const newOrder = {
        orderItems: cartItems.map(cartItem => ({
          productId: cartItem.product.id,
          quantity: cartItem.quantity,
          unitPrice: cartItem.product.price,
        }))
      }
      const orderService = new OrderService(accessToken)
      await orderService.newOrder(newOrder)
      setCartItems([])
      setGlobalError('')
    } catch (err) {
      console.log(err);
      
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
    <View style={styles.container}>
      <View style={styles.flatListContainer}>
        <FlatList
          data={cartItems}
          renderItem={({ item }) => <CartItemCard cartItem={item} disabled={isLoading} />}
          ItemSeparatorComponent={() => <View style={{ height: theme.spacing.lg }}></View>}
          ListHeaderComponent={() => <View style={{ height: theme.spacing.lg }}></View>}
          ListEmptyComponent={() => !globalError && (
            <View style={[styles.listEmptyContainer, {
              paddingVertical: theme.spacing.lg * 2,
              gap: theme.spacing.md,
            }]}>
              <EntypoIcons name='emoji-sad' size={theme.fontSizes.extraLarge * 2.5} color={theme.colors.darkIcon} />
              <Text style={[styles.listEmptyMessage, {
                fontSize: theme.fontSizes.extraLarge
              }]}>
                O carrinho está vazio...
              </Text>
            </View>
          )}
        />
      </View>
      <View style={[styles.footer, {
        backgroundColor: theme.colors.cardBackground,
        padding: theme.spacing.lg,
        gap: theme.spacing.lg
      }]}>
        <View style={styles.footerInfo}>
          <Text style={[styles.totalQuantity, {
            fontSize: theme.fontSizes.large
          }]}>
            Total de {totalQuantity} {totalQuantity === 0 ? 'Produto' : 'Produtos'}
          </Text>
          <Text style={[styles.totalPriceProducts, {
            fontSize: theme.fontSizes.medium
          }]}>
            {transformToMoney(totalPrice.toFixed(2))}
          </Text>
        </View>
        {!!globalError && (
          <ErrorList>
            <ErrorItem>{globalError}</ErrorItem>
          </ErrorList>
        )}
        <View style={styles.footerActions}>
          <Button
            disabled={isLoading || cartItems.length === 0}
            onPress={() => onSubmitOnPress()}
            style={{
              flexDirection: 'row',
              gap: theme.spacing.md,
            }}
            title="Finalizar pedido"
            icon={
              isLoading ? (
                <LoadingIcon color={theme.colors.darkIcon} />
              ) : (
                <MaterialIcons
                  name='shopping-cart-checkout'
                  size={theme.spacing.lg * 1.5}
                  color={theme.colors.icon} />
              )} />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatListContainer: {
    flexGrow: 1,
  },
  listEmptyContainer: {
    alignItems: 'center',
  },
  listEmptyMessage: {
    fontWeight: '500',
  },
  footer: {
    justifyContent: 'space-between'
  },
  footerInfo: {},
  totalQuantity: {
    fontWeight: 'bold',
  },
  totalPriceProducts: {
    fontWeight: '500',
  },
  footerActions: {},
})