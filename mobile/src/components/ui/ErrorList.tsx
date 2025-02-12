import { useTheme } from "@/src/hooks/useTheme"
import React from "react"
import { Dimensions, Text, View, ViewProps } from "react-native"

type Props = {
  children: React.ReactNode
} & ViewProps

export const ErrorList = ({ children, style, ...rest }: Props) => {

  const { theme } = useTheme()

  return (
    <View style={[{
      gap: theme.spacing.sm,
      alignItems: 'center',
      borderColor: theme.colors.error,
      borderRadius: theme.borderRadius.default,
      borderWidth: 1,
      width: '100%',
      padding: 20,
    }, style]} {...rest}>
      {children}
    </View>
  )
}