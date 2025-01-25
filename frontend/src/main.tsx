import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import { App } from './App'
import { ThemeProvider } from 'styled-components'
import {lightTheme } from './theme'

const Main = () => {
  return (
    <ThemeProvider theme={lightTheme}>
      <App />
    </ThemeProvider>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Main />
  </StrictMode>,
)
