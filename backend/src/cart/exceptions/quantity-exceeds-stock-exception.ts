export class QuantityExceedsStockException extends Error {
  constructor() {
    super('Quantidade excede o estoque.');
  }
}
