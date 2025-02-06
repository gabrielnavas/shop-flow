export class OrderNotFoundException extends Error {
  constructor() {
    super('Pedido de compra não encontrado.');
  }
}
