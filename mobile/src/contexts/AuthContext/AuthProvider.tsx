import React from "react"
import { AuthContext, PermissionRole } from "./AuthContext"

import { jwtDecode } from 'jwt-decode'

import AsyncStorage from '@react-native-async-storage/async-storage';

const asyncStorageKey = {
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
    async function setStatesFromLocalStorage() {
      const accessToken = await AsyncStorage.getItem(asyncStorageKey.accessToken)
      if (accessToken) {
        setAccessToken(accessToken)
      }

      const permissionRoles = JSON.parse(await AsyncStorage.getItem(asyncStorageKey.permissionRoles) || '[]') as PermissionRole[]
      if (permissionRoles) {
        setPermissionRoles(permissionRoles)
      }
    }
    setStatesFromLocalStorage()
  }, [])

  const signin = async (accessToken: string) => {
    setAccessToken(accessToken)
    await AsyncStorage.setItem(asyncStorageKey.accessToken, accessToken)

    const token = jwtDecode(accessToken) as Token | null
    if (!token) {
      throw new Error('Você não tem permissão para isso')
    }

    setPermissionRoles(token.roles)
    await AsyncStorage.setItem(asyncStorageKey.permissionRoles, JSON.stringify(token.roles))
  }

  const signout = async () => {
    setAccessToken('')
    setPermissionRoles([])
    await AsyncStorage.clear()
  }

  return (
    <AuthContext.Provider value={{
      accessToken,
      permissionRoles,
      signin,
      signout,
      isAuthenticated: !!accessToken,
    }}>
      {children}
    </AuthContext.Provider>
  )
}