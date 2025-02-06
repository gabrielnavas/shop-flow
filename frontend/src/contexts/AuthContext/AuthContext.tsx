import React from "react";

export type AuthContextType = {
  accessToken: string
  permissionRoles: PermissionRole[]
  signin: (accessToken: string) => void
  signout: () => void
  isAuthenticated: boolean
}

export enum PermissionRole {
  ADMIN = 'ADMIN',
  CONSUMER = 'CONSUMER',
}

export const AuthContext = React.createContext<AuthContextType | null>(null)
