export class UserPasswordInvalidException extends Error {
  constructor() {
    super('E-mail ou senha invalidos.');
  }
}
