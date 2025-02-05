export class CartItemNotFoundException extends Error {
  constructor(productName: string) {
    super(`Produto '${productName}' do carrinho não encontrado.`);
  }
}
