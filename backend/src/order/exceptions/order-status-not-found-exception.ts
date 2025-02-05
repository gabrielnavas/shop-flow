export class OrderStatusNotFoundException extends Error {
  constructor() {
    super('Status da order de compra não encontrado.');
  }
}
