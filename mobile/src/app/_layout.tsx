import { ThemeProvider } from "@/src/contexts/Theme/ThemeProvider";
import { Slot } from "expo-router";
import { StatusBar } from "react-native";
import { AuthProvider } from "../contexts/AuthContext/AuthProvider";

export default function AuthLayout() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Slot />
        <StatusBar barStyle="dark-content" />
      </ThemeProvider>
    </AuthProvider>
  )
}