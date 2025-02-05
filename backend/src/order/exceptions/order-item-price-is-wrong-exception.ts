export class OrderItemPriceIsWrongException extends Error {
  constructor() {
    super(
      'Preço do item do carrinho e o preço do produto não são conrrespondentes.',
    );
  }
}
