export class OrderItemsIsEmptyException extends Error {
  constructor() {
    super('Item do pedido de compra está vazio.');
  }
}
