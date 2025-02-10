import { useTheme } from "@/src/hooks/useTheme";
import React from "react";
import { StyleSheet, TextInput, TextInputProps, View, Keyboard, TouchableWithoutFeedback, Alert, Dimensions } from "react-native";

type Props = {
  error?: boolean;
} & TextInputProps;

export const Input = React.forwardRef<TextInput, Props>(
  ({ error, ...rest }: Props, ref) => {
    const { theme } = useTheme();

    const [ísFocused, setIsFocused] = React.useState(false)

    return (
      <TextInput
        ref={ref}  // Atribui a ref ao TextInput
        style={[
          styles.input,
          {
            backgroundColor: theme.colors.background,
            borderRadius: theme.borderRadius.default,
            paddingHorizontal: theme.spacing.md,
            borderColor: error
              ? theme.colors.error
              : ísFocused
                ? theme.colors.textPrimary
                : theme.colors.textSecondary,
            color: error ? theme.colors.error : theme.colors.textPrimary,
            borderWidth: ísFocused ? 1.5 : 1.0,
          },
        ]}
        {...rest}
        onFocus={() => setIsFocused(true)}
        onBlur={(event) => {
          if (rest.onBlur) {
            rest.onBlur(event)
          }
          setIsFocused(false)
        }}
      />
    );
  }
);

const styles = StyleSheet.create({
  input: {
    width: Dimensions.get('screen').width * .75,
    height: 50,
  },
});
