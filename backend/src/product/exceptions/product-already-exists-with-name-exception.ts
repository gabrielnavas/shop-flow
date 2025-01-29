export class ProductAlreadyExistsWithNameException extends Error {
  constructor(name: string) {
    super(`Producto já existe com o nome: ${name}`);
    this.name = 'ProductAlreadyExistsWithNameException';
  }
}
