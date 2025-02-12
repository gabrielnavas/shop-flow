import { Button } from "@/src/components/ui/Button";
import { CartItemCard } from "@/src/components/layout/CartItemCard";
import { Input } from "@/src/components/ui/Input";
import { useAuth } from "@/src/hooks/useAuth";
import { useCart } from "@/src/hooks/useCart";
import { useTheme } from "@/src/hooks/useTheme";
import { CartService } from "@/src/services/cart-service";
import { router } from "expo-router";
import React from "react";
import { FlatList, View } from "react-native";

export default function CartScreen() {

  const { setCartItems, cartItems } = useCart()
  const { isAuthenticated, accessToken } = useAuth()

  const { theme } = useTheme()

  React.useEffect(() => {
    async function fetchCartItems() {
      if(isAuthenticated) {
        const cartService = new CartService(accessToken)
        const cartItems = await cartService.fetchCartItems()
        setCartItems(cartItems)
      }
    }
    fetchCartItems()
  }, [])

  return (
    <FlatList
      data={cartItems}
      renderItem={({ item }) => <CartItemCard cartItem={item} />}
      ItemSeparatorComponent={() => <View style={{ height: theme.spacing.lg }}></View>}
      ListHeaderComponent={() => <View style={{ height: theme.spacing.lg }}></View>}
    />
  )
}
