export type SignUpDto = {
  email: string;
  password: string;
  fullname: string;
};

export type SignInDto = {
  email: string;
  password: string;
};

export type UserDto = {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
};
