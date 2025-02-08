import { ThemeProvider } from '@/contexts/Theme/ThemeProvider'
import { Stack } from 'expo-router'

export default function IndexLayout() {
  return (
    <ThemeProvider>
      <Stack>
        <Stack.Screen name='index' />
      </Stack>
    </ThemeProvider>
  )
}
