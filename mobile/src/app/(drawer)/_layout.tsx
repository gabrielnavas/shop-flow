import Drawer from "expo-router/drawer";

export default function DrawerLayout() {
  return (
    <Drawer>
      <Drawer.Screen name="(tabs)" options={{ title: 'Shop Flow', drawerLabel: 'Catálogo de produtos' }} />
      <Drawer.Screen name="logout" options={{ drawerLabel: 'Sair' }} />
    </Drawer>
  )
}
