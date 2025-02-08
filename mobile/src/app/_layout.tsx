import { ThemeProvider } from "@/src/contexts/Theme/ThemeProvider";
import { Slot } from "expo-router";
import { StatusBar } from "react-native";

export default function AuthLayout() {
  return (
    <ThemeProvider>
      <Slot />
      <StatusBar barStyle="dark-content" />
    </ThemeProvider>
  )
}