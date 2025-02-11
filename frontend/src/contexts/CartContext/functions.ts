import { CartItem } from "./CartContext";

export function mergeCartItems(cartItems1: CartItem[], cartItems2: CartItem[]) {
  const mergedItemsMap = new Map<number, CartItem>();


  // Adicionar itens existentes ao mapa
  cartItems2.forEach(cartItem2 => {
    mergedItemsMap.set(cartItem2.product.id, { ...cartItem2 });
  });

  // Adicionar ou atualizar itens do novo carrinho
  cartItems1.forEach(cartItem1 => {
    if (mergedItemsMap.has(cartItem1.product.id)) {
      const existingItem = mergedItemsMap.get(cartItem1.product.id)!;
      mergedItemsMap.set(cartItem1.product.id, {
        ...existingItem,
        quantity: existingItem.quantity + cartItem1.quantity,
      });
    } else {
      mergedItemsMap.set(cartItem1.product.id, { ...cartItem1 });
    }
  });

  // Retornar os itens mesclados como array
  return Array.from(mergedItemsMap.values());
}