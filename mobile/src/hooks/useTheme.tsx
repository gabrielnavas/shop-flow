import { ThemeContext, ThemeContextType } from "@/src/contexts/Theme/ThemeContext";
import React from "react";

export const useTheme = (): ThemeContextType => {
  const context = React.useContext(ThemeContext) as ThemeContextType;
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
