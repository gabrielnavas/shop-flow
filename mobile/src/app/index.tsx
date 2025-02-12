import { Redirect } from "expo-router";

export default function IndexApp() {
  return (
    <Redirect href='/(drawer)/(tabs)/products' />
  )
}