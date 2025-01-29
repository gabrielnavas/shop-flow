export class CategoryNotFoundException extends Error {
  constructor(name: string) {
    super(`Categoria não encontrada pelo nome: ${name}.`);
    this.name = 'CategoryNotFound';
  }
}
