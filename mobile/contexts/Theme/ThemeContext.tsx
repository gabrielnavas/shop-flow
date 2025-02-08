import { Theme } from "@/constants/Theme"
import React from "react"

export type ThemeContextType = {
  theme: typeof Theme
}

export const ThemeContext = React.createContext<ThemeContextType | null>(null)