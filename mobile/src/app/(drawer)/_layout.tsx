import { useAuth } from "@/src/hooks/useAuth";
import { useTheme } from "@/src/hooks/useTheme";
import Drawer from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AntDesignIcons from "react-native-vector-icons/AntDesign";

export default function DrawerLayout() {
  const { isAuthenticated } = useAuth()
  const { theme } = useTheme()

  // usado pra forçar o drawer rerenderizar por causa do logout
  const drawerKey = isAuthenticated ? 'authenticated' : 'unauthenticated'

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer key={drawerKey}>
        <Drawer.Screen
          name="(tabs)"
          options={{
            title: 'Shop Flow',
            drawerLabel: 'Catálogo de produtos',
            drawerIcon: ({ focused, size }) => (
              <AntDesignIcons
                name="home"
                size={size}
                color={focused ? theme.colors.buttonBackgroundActive : theme.colors.buttonBackgroundDisabled} // Cor do ícone ativo e inativo
              />
            ),
          }} />
        <Drawer.Screen
          name="logout"
          options={{
            title: 'Shop Flow',
            drawerLabel: 'Sair',
            drawerItemStyle: { display: isAuthenticated ? 'flex' : 'none' },
            drawerIcon: ({ focused, size }) => (
              <AntDesignIcons
                name="logout"
                size={size}
                color={focused ? theme.colors.buttonBackgroundActive : theme.colors.buttonBackgroundDisabled} // Cor do ícone ativo e inativo
              />
            ),
          }} />
        <Drawer.Screen
          name="signin"
          options={{
            title: 'Shop Flow',
            drawerLabel: 'Entrar',
            drawerItemStyle: { display: !isAuthenticated ? 'flex' : 'none' },
            drawerIcon: ({ focused, size }) => (
              <AntDesignIcons
                name="login"
                size={size}
                color={focused ? theme.colors.buttonBackgroundActive : theme.colors.buttonBackgroundDisabled} // Cor do ícone ativo e inativo
              />
            ),
          }} />
        <Drawer.Screen
          name="signup"
          options={{
            title: 'Shop Flow',
            drawerLabel: 'Criar conta',
            drawerItemStyle: { display: !isAuthenticated ? 'flex' : 'none' },
            drawerIcon: ({ focused, size }) => (
              <AntDesignIcons
                name="adduser"
                size={size}
                color={focused ? 'tomato' : theme.colors.buttonBackgroundDisabled} // Cor do ícone ativo e inativo
              />
            ),
          }} />
      </Drawer>
    </GestureHandlerRootView>
  )
}
