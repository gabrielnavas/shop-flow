export class ProductCannotBeDeletedException extends Error {
  constructor() {
    super(
      'Producto não pode ser deletado. Está em uso em pedidos ou em uso nos carrinhos.',
    );
  }
}
