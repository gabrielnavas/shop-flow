import { AuthContext, AuthContextType } from "@/src/contexts/AuthContext/AuthContext"
import { router } from "expo-router"
import React from "react"
import { View } from "react-native"
import { Text } from "react-native"
import { Alert } from "react-native"

export default function LogoutScreen() {
  const { signout, isAuthenticated } = React.useContext(AuthContext) as AuthContextType

  React.useEffect(() => {
    signout()
      .then(() => {
        router.push('/products')
      })
      .catch((err) => {
        if (err instanceof Error) {
          Alert.alert("Atenção!", err.message)
        } else {
          Alert.alert("Aconteceu um problema", "Tente novamente mais tarde")
        }
      })
  }, [signout])

  return (
    <View>
      <Text>deslogando.... {isAuthenticated ? 'logado': 'deslogad'}</Text>
    </View>
  )
}
