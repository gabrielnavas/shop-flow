export class QuantityZeroException extends Error {
  constructor() {
    super('Quantidade não pode ser menor que uma (1) unidade');
  }
}
