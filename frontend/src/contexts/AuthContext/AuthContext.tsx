import React from "react";

export type AuthContextType = {
  accessToken: string
  signin: (accessToken: string) => void
  signout: () => void
  isAuthencated: boolean
}

export const AuthContext = React.createContext<AuthContextType | null>(null)
