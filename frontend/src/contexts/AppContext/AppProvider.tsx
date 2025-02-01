import { AuthProvider } from "../AuthContext/AuthProvider";
import { CartProvider } from "../CartContext/CartProvider";
import { ProductProvider } from "../ProductContext/ProductProvider";

type Props = {
  children: React.ReactNode
}

export const AppProvider = ({ children }: Props) => (
  <AuthProvider>
    <ProductProvider>
      <CartProvider>{children}</CartProvider>
    </ProductProvider>
  </AuthProvider>
);
