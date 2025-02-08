import { Theme } from "@/constants/Theme"
import { ThemeContext } from "./ThemeContext"

type Props = {
  children: React.ReactNode
}

export const ThemeProvider = ({children}: Props) => {
  return (
    <ThemeContext.Provider value={{
      theme: {...Theme}
    }}>
      {children}
    </ThemeContext.Provider>
  )
}