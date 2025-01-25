import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import { MyRoutes } from './Routes'
import { ThemeProvider } from 'styled-components'
import { lightTheme } from './theme'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={lightTheme}>
      <MyRoutes />
    </ThemeProvider>
  </StrictMode>,
)
