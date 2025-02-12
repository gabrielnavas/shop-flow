import { useTheme } from "@/src/hooks/useTheme";
import React from "react";
import { StyleSheet, TextInput, TextInputProps, Dimensions } from "react-native";

type Props = {
  error?: boolean;
} & TextInputProps;

export const Input = React.forwardRef<TextInput, Props>(
  ({ error, style, ...rest }: Props, ref) => {
    const { theme } = useTheme();

    const [isFocused, setIsFocused] = React.useState(false)

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
              : isFocused
                ? theme.colors.textPrimary
                : theme.colors.textSecondary,
            color: error ? theme.colors.error : theme.colors.textPrimary,
            borderWidth: isFocused ? 1.5 : 1.0,
          },
          style
        ]}
        onFocus={() => setIsFocused(true)}
        onBlur={(event) => {
          if (rest.onBlur) {
            rest.onBlur(event)
          }
          setIsFocused(false)
        }}
        {...rest}
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
