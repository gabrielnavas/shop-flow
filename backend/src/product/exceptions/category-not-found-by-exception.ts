export class CategoryNotFoundException extends Error {
  constructor(name: string) {
    super(`Category not found by name: ${name}`);
    this.name = 'CategoryNotFound';
  }
}
