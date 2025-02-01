export class ProductAlreadyExistsWithNameException extends Error {
  constructor(name: string) {
    super(`Produto já existe com o nome: ${name}`);
    this.name = 'ProductAlreadyExistsWithNameException';
  }
}
