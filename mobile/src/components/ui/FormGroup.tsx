import { StyleSheet, View, ViewProps } from "react-native"

type Props = {
  children: React.ReactNode
} & ViewProps

export const FormGroup = ({ children, ...rest }: Props) => {
  return (
    <View style={styles.container} {...rest}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 2
  }
})