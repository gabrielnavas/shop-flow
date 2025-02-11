import { useAuth } from "@/src/hooks/useAuth"
import { router } from "expo-router"
import { useEffect } from "react"

export default function LogoutScreen() {

  const { signout } = useAuth()

  useEffect(() => {
    signout()
    router.replace({
      pathname: '/signin',
      params: { message: 'Até mais! :)' }
    })
  }, [])

  return null
}
