import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import { MyRoutes } from './routes/Routes'
import { ThemeProvider } from 'styled-components'
import { theme } from './theme'
import { AppProvider } from './contexts/AppContext/AppProvider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <AppProvider>
        <MyRoutes />
      </AppProvider>
    </ThemeProvider>
  </StrictMode>,
)
