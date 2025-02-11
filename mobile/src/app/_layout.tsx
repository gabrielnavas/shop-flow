import { ThemeProvider } from "@/src/contexts/Theme/ThemeProvider";
import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import { AuthProvider } from "../contexts/AuthContext/AuthProvider";

export default function Layout() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Stack>
          <Stack.Screen name="signin" />
          <Stack.Screen name="signup" />
          <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
        </Stack>
        <StatusBar barStyle="dark-content" />
      </ThemeProvider>
    </AuthProvider>
  )
}
