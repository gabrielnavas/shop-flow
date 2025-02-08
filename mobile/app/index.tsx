import { useTheme } from "@/hooks/useTheme";
import { StyleSheet, Text, View } from "react-native";

export default function IndexScreen() {
  const { theme } = useTheme()
  return (
    <View style={[
      styles.container, {
        backgroundColor: theme.colors.background,
      }]}>
      <Text style={[
        styles.text, {
          color: theme.colors.textSecondary
        }]}>Hello World!</Text>
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
