export class CartItemNotFoundException extends Error {
  constructor() {
    super('Item do carrinho não encontrado.');
  }
}
