import { useTheme } from "@/src/hooks/useTheme"
import React from "react"
import { Text } from "react-native"

type Props = {
  children: React.ReactNode
}

export const ErrorItem = ({ children }: Props) => {

  const { theme } = useTheme()

  return (
    <Text style={{
      color: theme.colors.error
    }}>
      {children}
    </Text>
  )
}