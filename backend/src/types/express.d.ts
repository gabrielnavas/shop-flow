import { Token } from 'src/user/models';

declare global {
  namespace Express {
    export interface Request {
      loggedUser?: Token;
    }
  }
}
