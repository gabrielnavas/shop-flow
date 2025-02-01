import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { MyRoutes } from './routes/Routes'
import { ThemeProvider } from 'styled-components'
import { theme } from './theme'
import { AppProvider } from './contexts/AppContext/AppProvider'
import GlobalStyles from './GlobalStyles'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AppProvider>
        <MyRoutes />
      </AppProvider>
    </ThemeProvider>
  </StrictMode>,
)
