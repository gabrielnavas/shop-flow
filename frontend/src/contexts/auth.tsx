import React from "react"

export type AuthContextType = {
  accessToken: string
  signin: (accessToken: string) => void
  signout: () => void
  isAuthencated: boolean
}

const localStorageKey = {
  accessToken: 'accessToken'
}

export const AuthContext = React.createContext<AuthContextType | null>(null)

type Props = {
  children: React.ReactNode
}

export const AuthProvider = ({ children }: Props) => {
  const [accessToken, setAccessToken] = React.useState('')

  React.useEffect(() => {
    setAccessToken(localStorage.getItem(localStorageKey.accessToken) || '')
  }, [])

  const signin = (accessToken: string) => {
    setAccessToken(accessToken)
    localStorage.setItem(localStorageKey.accessToken, accessToken)
  }

  const signout = () => {
    setAccessToken('')
    localStorage.clear()
  }

  return (
    <AuthContext.Provider value={{
      accessToken,
      signin,
      signout,
      isAuthencated: !!accessToken,
    }}>
      {children}
    </AuthContext.Provider>
  )
}