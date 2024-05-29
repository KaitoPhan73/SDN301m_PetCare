import { message } from "antd";
import z from "zod";

export const AuthBase = z.object({
  accessToken: z.string(),
  id: z.string(),
  username: z.string(),
  name: z.string(),
  role: z.string(),
  status: z.string(),
  brandName: z.string(),
});

export const LoginBody = z
  .object({
    username: z.string(),
    password: z.string(),
  })
  .strict();

export type TLoginBody = z.TypeOf<typeof LoginBody>;
export const LoginResponse = AuthBase;

export type TLoginResponse = z.TypeOf<typeof LoginResponse>;
