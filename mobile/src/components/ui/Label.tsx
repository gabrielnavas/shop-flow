import { StyleSheet, Text, TextProps } from "react-native"

type Props = {

} & TextProps

export const Label = ({ ...rest }: Props) => {
  return (
    <Text
      style={styles.text}
      {...rest}
    />
  )
}

const styles = StyleSheet.create({
  text: {}
})