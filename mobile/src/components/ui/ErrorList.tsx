import { useTheme } from "@/src/hooks/useTheme"
import React from "react"
import { Dimensions, Text, View } from "react-native"

type Props = {
  children: React.ReactNode
}

export const ErrorList = ({ children }: Props) => {

  const { theme } = useTheme()

  return (
    <View style={{
      gap: theme.spacing.sm,
      alignItems: 'center',
      borderColor: theme.colors.error,
      borderRadius: theme.borderRadius.default,
      borderWidth: 1,
      width: Dimensions.get('screen').width * .75,
      padding: 20,
    }}>
      {children}
    </View>
  )
}