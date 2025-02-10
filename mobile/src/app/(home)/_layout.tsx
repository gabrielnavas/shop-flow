import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import FeatherIcon from 'react-native-vector-icons/Feather';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TextStyle, StyleProp } from 'react-native';

export default function HomeLayout() {

  const drawerLabelStyle = {
    fontWeight: 'bold',
    fontSize: 16
  } as StyleProp<TextStyle>

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer>
        <Drawer.Screen
          name="home"
          options={{
            title: 'Catálogo de produtos',
            drawerLabel: 'Catálogo de produtos',
            drawerIcon: () => <FeatherIcon size={20} name='package' />,
            drawerLabelStyle: drawerLabelStyle,
          }}
        />
        <Drawer.Screen
          name="logout"
          options={{
            drawerLabel: 'Sair',
            drawerIcon: () => <MaterialCommunityIcon size={20} name='logout' />,
            drawerLabelStyle: drawerLabelStyle,
          }}
        />
      </Drawer>
    </GestureHandlerRootView>

  )
}