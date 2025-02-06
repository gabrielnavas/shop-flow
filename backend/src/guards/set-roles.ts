import { SetMetadata } from '@nestjs/common';

export const SetRolesKey = 'roles';
export const SetRoles = (...roles: string[]) => SetMetadata(SetRolesKey, roles);
