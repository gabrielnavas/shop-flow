import { useAuth } from "@/src/hooks/useAuth";
import Drawer from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function DrawerLayout() {
  const { isAuthenticated } = useAuth()

  // usado pra forçar o drawer rerenderizar por causa do logout
  const drawerKey = isAuthenticated ? 'authenticated' : 'unauthenticated'

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer key={drawerKey}>
        <Drawer.Screen
          name="(tabs)"
          options={{
            title: 'Shop Flow',
            drawerLabel: 'Catálogo de produtos'
          }} />
        <Drawer.Screen
          name="logout"
          options={{
            title: 'Shop Flow',
            drawerLabel: 'Sair',
            drawerItemStyle: { display: isAuthenticated ? 'flex' : 'none' }
          }} />
        <Drawer.Screen
          name="signin"
          options={{
            title: 'Shop Flow',
            drawerLabel: 'Entrar',
            drawerItemStyle: { display: !isAuthenticated ? 'flex' : 'none' }
          }} />
        <Drawer.Screen
          name="signup"
          options={{
            title: 'Shop Flow',
            drawerLabel: 'Criar conta',
            drawerItemStyle: { display: !isAuthenticated ? 'flex' : 'none' }
          }} />
      </Drawer>
    </GestureHandlerRootView>
  )
}
