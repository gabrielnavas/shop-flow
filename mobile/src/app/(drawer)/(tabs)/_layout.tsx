import { useTheme } from "@/src/hooks/useTheme";
import { Tabs } from "expo-router";
import AntDesignIcons from "react-native-vector-icons/AntDesign";

export default function Layout() {
  const { theme } = useTheme()
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string = '';

          if (route.name === 'products') {
            iconName = focused ? 'home' : 'home';
          } else if (route.name === 'cart') {
            iconName = focused ? 'shoppingcart' : 'shoppingcart';
          }

          return <AntDesignIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.colors.buttonBackgroundActive,
        tabBarInactiveTintColor: theme.colors.buttonBackgroundDisabled,
        tabBarShowLabel: false,
        headerShown: false,
      })}    >
      <Tabs.Screen name='products' />
      <Tabs.Screen name='cart' />
    </Tabs>
  )
}