import { Tabs } from "expo-router";

export default function Layout() {
  return (
    <Tabs>
      <Tabs.Screen name='products' options={{ headerShown: false }} />
      <Tabs.Screen name='cart' options={{ headerShown: false }} />
    </Tabs>
  )
}