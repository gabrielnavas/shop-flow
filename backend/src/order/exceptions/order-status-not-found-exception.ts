export class OrderStatusNotFoundException extends Error {
  constructor() {
    super('Status do pedido de compra não encontrado.');
  }
}
