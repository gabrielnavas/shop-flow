import { ThemeProvider } from "@/src/contexts/Theme/ThemeProvider";
import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import { AuthProvider } from "../contexts/AuthContext/AuthProvider";
import { CartProvider } from "../contexts/CartContext/CartProvider";
import React from "react";

export default function Layout() {
  return (
    <>
      <AuthProvider>
        <ThemeProvider>
          <CartProvider>
            <Stack>
              <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
              <Stack.Screen name="index" options={{ headerShown: false }} />
            </Stack>
          </CartProvider>
        </ThemeProvider>
      </AuthProvider>
      <StatusBar barStyle="dark-content" />
    </>
  )
}
