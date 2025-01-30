import { AuthProvider } from "../AuthContext/AuthProvider";
import { CartProvider } from "../CartContext/CartProvider";

type Props = {
  children: React.ReactNode
}

export const AppProvider = ({ children }: Props) => (
  <AuthProvider>
    <CartProvider>{children}</CartProvider>
  </AuthProvider>
);
