export class UserAlreadyExistsEmail extends Error {
  constructor() {
    super('Usuário já existe com esse endereço de e-mail.');

    // Nome da classe no erro (opcional, mas útil para debug)
    this.name = 'UserAlreadyExistsEmail';
  }
}
