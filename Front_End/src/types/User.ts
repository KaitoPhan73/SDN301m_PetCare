export type TLogin = {
  username: String;
  password: String;
};

export type TUpdateUser = {
  name: string;
  username: string;
  role: string;
  status: boolean;
  email: string;
};

export type TUser = {
  _id: string;
  name: string;
  username: string;
  role: string;
  status: boolean;
  brandName: string;
  email: string;
};
