import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Token } from 'src/user/models';
import { SetRolesKey } from 'src/guards/set-roles';

@Injectable()
export class RolesJwt implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>(
      SetRolesKey,
      context.getHandler(),
    );
    if (!requiredRoles) {
      return true; // Se a rota não exigir papéis, libera o acesso
    }

    const request: Request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return false; // Sem token JWT, acesso negado
    }

    const token = authHeader.split(' ')[1];
    const payload: Token = this.jwtService.decode(token);

    if (
      !payload ||
      !payload.sub ||
      !payload.roles ||
      typeof payload !== 'object' ||
      typeof payload.sub !== 'number' ||
      typeof payload.roles.length !== 'number'
    ) {
      return false; // Se não encontrar o papel no token, acesso negado
    }

    // Adicionar o payload ao objeto `request` para uso posterior
    request.loggedUser = payload;

    // verifica se todas as roles estão na role do payload do token
    const everyRoles = requiredRoles.every((role) =>
      payload.roles.some((r) => r === role),
    );
    return everyRoles;
  }
}
