import { AuthProvider } from "./contexts/AuthContext/AuthContext";
import { CartProvider } from "./contexts/CartContext/CartContext";

export const AppProviders = ({ children }: { children: React.ReactNode }) => (
  <AuthProvider>
    <CartProvider>{children}</CartProvider>
  </AuthProvider>
);