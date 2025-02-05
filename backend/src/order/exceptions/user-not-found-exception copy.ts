export class UserNotFoundException extends Error {
  constructor() {
    super('Usuário não encontrado.');
  }
}
