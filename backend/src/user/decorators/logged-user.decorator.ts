import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Token } from 'src/user/models';

import { Request } from 'express';

export const LoggedUser = createParamDecorator(
  (data: keyof Token | undefined, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest(); // Mesmo request
    const user = request.loggedUser;
    return data ? user?.[data] : user; // Retorna o campo ou o objeto inteiro
  },
);
