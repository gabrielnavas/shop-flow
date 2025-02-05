import React from "react"
import { AuthContext, PermissionRole } from "./AuthContext"

import { jwtDecode } from 'jwt-decode'

const localStorageKey = {
  accessToken: 'access-token',
  permissionRoles: 'permission-roles',
}

type Token = {
  exp?: number;
  iat?: number;
  roles: PermissionRole[];
  sub: number;
};


type Props = {
  children: React.ReactNode
}

export const AuthProvider = ({ children }: Props) => {
  const [accessToken, setAccessToken] = React.useState<string>('')
  const [permissionRoles, setPermissionRoles] = React.useState<PermissionRole[]>([])

  React.useEffect(() => {
    function setStatesFromLocalStorage() {
      const accessToken = localStorage.getItem(localStorageKey.accessToken)
      if (accessToken) {
        setAccessToken(accessToken)
      }
  
      const permissionRoles = JSON.parse(localStorage.getItem(localStorageKey.permissionRoles) || '[]') as PermissionRole[]
      if (permissionRoles) {
        setPermissionRoles(permissionRoles)
      }
    }
    setStatesFromLocalStorage()
  }, [])

  const signin = (accessToken: string) => {
    setAccessToken(accessToken)
    localStorage.setItem(localStorageKey.accessToken, accessToken)

    const token = jwtDecode(accessToken) as Token | null
    if (!token) {
      throw new Error('Você não tem permissão para isso')
    }

    setPermissionRoles(token.roles)
    localStorage.setItem(localStorageKey.permissionRoles, JSON.stringify(token.roles))
  }

  const signout = () => {
    setAccessToken('')
    localStorage.clear()
  }

  return (
    <AuthContext.Provider value={{
      accessToken,
      permissionRoles,
      signin,
      signout,
      isAuthencated: !!accessToken,
    }}>
      {children}
    </AuthContext.Provider>
  )
}