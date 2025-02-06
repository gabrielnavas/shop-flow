export class ProductNotFoundException extends Error {
  constructor() {
    super('Produto não encontrado ou fora de estoque.');
  }
}
