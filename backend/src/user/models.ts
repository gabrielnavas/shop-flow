export type Token = {
  exp?: number;
  iat?: number;
  roles: string[];
  sub: number;
};
