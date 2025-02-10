import { useTheme } from '@/src/hooks/useTheme'
import React from 'react'
import { TouchableOpacity, StyleSheet, TouchableOpacityProps, Text, ViewStyle, StyleProp, Dimensions } from 'react-native'

type Variant = "primary" | "outlined" | "error" | "warning" | "cancel"

type Props = {
  title: string
  variant?: Variant
  icon?: React.ReactNode
} & TouchableOpacityProps


export const Button = ({ icon, title, variant = "primary", ...rest }: Props) => {

  const { theme } = useTheme()

  let themeVarient: StyleProp<ViewStyle> = {
    backgroundColor: theme.colors.buttonBackgroundPrimary,
  }

  if (variant === 'outlined') {
    themeVarient = {
      backgroundColor: theme.colors.buttonBackgroundSecondary,
      borderColor: theme.colors.borderColor,
      borderWidth: 1
    }
  }


  if (variant === 'error') {
    themeVarient = {
      backgroundColor: theme.colors.buttonBackgroundError,
    }
  }

  return (
    <TouchableOpacity
      style={[styles.button, {
        paddingHorizontal: theme.spacing.xs,
        paddingVertical: theme.spacing.sm,
        borderRadius: theme.borderRadius.default
      },
        themeVarient]}
      {...rest}>
      {icon ? icon : (
        <Text style={{
          color: variant === 'outlined' ? theme.colors.textPrimary : theme.colors.textPrimaryDark,
          fontWeight: '500',
          fontSize: theme.fontSizes.medium
        }}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    width: Dimensions.get('screen').width * .75,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {},
})

