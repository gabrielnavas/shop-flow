import { useTheme } from '@/src/hooks/useTheme'
import React from 'react'
import { TextProps, TextStyle } from 'react-native'
import { TouchableOpacity, StyleSheet, TouchableOpacityProps, Text, ViewStyle, StyleProp, Dimensions } from 'react-native'

type Variant = "primary" | "outlined" | "error" | "warning" | "cancel"

type Props = {
  title?: string
  variant?: Variant
  icon?: React.ReactNode
  styleText?: StyleProp<TextStyle>
} & TouchableOpacityProps


export const Button = ({ icon, disabled, style, styleText, title, variant = "primary", ...rest }: Props) => {

  const { theme } = useTheme()

  let themeVarientContainer: StyleProp<ViewStyle> = {
    backgroundColor: theme.colors.buttonBackgroundPrimary
  }

  let themeVarientText: StyleProp<TextStyle> = {
    color: theme.colors.textPrimaryDark,
    fontWeight: '500',
    fontSize: theme.fontSizes.medium
  }

  if (variant === 'outlined') {
    themeVarientContainer = {
      ...themeVarientContainer,
      backgroundColor: theme.colors.buttonBackgroundSecondary,
      borderColor: theme.colors.borderColor,
      borderWidth: 1
    }
  }

  if (variant === 'error') {
    themeVarientContainer = {
      ...themeVarientContainer,
      backgroundColor: theme.colors.buttonBackgroundError,
    }
  }


  if (variant === 'cancel') {
    themeVarientContainer = {
      ...themeVarientContainer,
      backgroundColor: theme.colors.buttonBackgroundCancel,
    }
    themeVarientText = {
      ...themeVarientText,
      fontWeight: 'bold',
    }
  }

  if(disabled) {
    themeVarientContainer = {
      ...themeVarientContainer,
      backgroundColor: theme.colors.buttonBackgroundDisabled,
    }
    themeVarientText = {
      ...themeVarientText,
      color: theme.colors.textDisabled,
    }
  }

  return (
    <TouchableOpacity
      style={[styles.button, {
        paddingHorizontal: theme.spacing.xs,
        paddingVertical: theme.spacing.sm,
        borderRadius: theme.borderRadius.default,
      },
        themeVarientContainer,
        style
      ]}
      {...rest}>
      {icon && icon}

      {!!title && (
        <Text style={[themeVarientText, styleText]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {},
})

