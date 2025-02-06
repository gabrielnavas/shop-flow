import { Token } from 'src/user/models';

declare module 'socket.io' {
  export interface Socket {
    loggedUser?: Token;
  }
}
