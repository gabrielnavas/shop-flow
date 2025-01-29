import { RoleName } from 'src/entities/role-name.enum';

export class RoleNotFoundException extends Error {
  constructor(roleNames: RoleName[]) {
    super(`missing roles ${roleNames.toString()}`);
  }
}
