export class ProductAlreadyExistsWithNameException extends Error {
  constructor(name: string) {
    super(`Product already exists with name: ${name}`);
    this.name = 'ProductAlreadyExistsWithNameException';
  }
}
