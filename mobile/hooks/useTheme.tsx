import { ThemeContext, ThemeContextType } from "@/contexts/Theme/ThemeContext";
import React from "react";

export const useTheme = () => {
  return React.useContext(ThemeContext) as ThemeContextType
}