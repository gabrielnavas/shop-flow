import React from "react"
import { Button, StyleSheet, Text, View } from "react-native"

import { useTheme } from "@/src/hooks/useTheme"
import { router } from "expo-router"

export default function SignUpScreen() {
  const { theme } = useTheme()
  return (
    <View style={[
      styles.container, {
        backgroundColor: theme.colors.background,
      }]}>
      <Text style={[
        styles.text, {
          color: theme.colors.textSecondary
        }]}>
        Sign Up!
      </Text>
      <Button title="Entrar!" onPress={() => router.replace('/signin')} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 50,
  }
})
