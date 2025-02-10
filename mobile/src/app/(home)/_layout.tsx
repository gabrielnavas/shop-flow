import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';

export default function HomeLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer>
        <Drawer.Screen
          name="home"
          options={{
            drawerLabel: 'Catálogo de produtos',
            title: 'Catálogo de produtos',
          }}
        />
        <Drawer.Screen
          name="logout"
          options={{
            drawerLabel: 'Sair',
          }}
        />
      </Drawer>
    </GestureHandlerRootView>

  )
}