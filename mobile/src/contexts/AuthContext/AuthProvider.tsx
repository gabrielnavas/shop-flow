import React from "react"
import { AuthContext, PermissionRole } from "./AuthContext"

import { jwtDecode } from 'jwt-decode'

import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from "expo-router";

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
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false)
  const [permissionRoles, setPermissionRoles] = React.useState<PermissionRole[]>([])

  React.useLayoutEffect(() => {
    async function setStatesFromAsyncStorage() {
      const accessToken = await AsyncStorage.getItem(asyncStorageKey.accessToken)
      if (accessToken) {
        setAccessToken(accessToken)
        setIsAuthenticated(true)
      }

      const permissionRoles = JSON.parse(await AsyncStorage.getItem(asyncStorageKey.permissionRoles) || '[]') as PermissionRole[]
      if (permissionRoles) {
        setPermissionRoles(permissionRoles)
      }
    }
    setStatesFromAsyncStorage()
  }, [])

  const signin = React.useCallback(async (accessToken: string) => {
    const token = jwtDecode(accessToken) as Token | null
    if (!token) {
      throw new Error('Você não tem permissão para isso')
    }

    await AsyncStorage.setItem(asyncStorageKey.accessToken, accessToken)
    await AsyncStorage.setItem(asyncStorageKey.permissionRoles, JSON.stringify(token.roles))

    setPermissionRoles(token.roles)
    setAccessToken(accessToken)
    setIsAuthenticated(true)
  }, [])

  const signout = React.useCallback(async () => {
    try {
      await AsyncStorage.clear()
      setPermissionRoles([])
      setAccessToken('')
      setIsAuthenticated(false)
    } catch (err) {
      console.log(err);
    }
  }, [])

  return (
    <AuthContext.Provider value={{
      accessToken,
      permissionRoles,
      signin,
      signout,
      isAuthenticated,
    }}>
      {children}
    </AuthContext.Provider>
  )
}