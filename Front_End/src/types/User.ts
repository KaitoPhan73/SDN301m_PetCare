export type TLogin = {
  username: String;
  password: String;
};

export type TResponseLogin = {
  accessToken: string;
  username: string;
  name: string;
  role: string;
  status: string;
  brandName?: string;
};

export type TUserBase = {
  id: string;
  username: string;
  name: string;
  role: boolean;
  status: boolean;
  storeId: string;
  storeCode: string;
  brandId: string;
  brandCode: string;
};

export type TUser = {
  id: string;
  name: string;
  username: string;
  role: string;
  status: string;
  brandName: string;
};
<<<<<<< HEAD

export type User = {
  createdAt: string;
  name: string;
  avatar: string;
  role: string;
  id: string;
  badge: boolean;
};
=======
>>>>>>> 50d63dc22eb4b76d916a4aa5d919802afbfe16df
