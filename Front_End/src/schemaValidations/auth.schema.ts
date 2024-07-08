import { message } from "antd";
import z, { boolean } from "zod";

export const RegisterSchema = z.object({
  username: z.string(),
  password: z.string(),
  email: z.string(),
  confirmPassword: z.string(),
  role: z.string(),
});

export const LoginBody = z
  .object({
    username: z.string(),
    password: z.string(),
  })
  .strict();

export type TLoginBody = z.TypeOf<typeof LoginBody>;

export type TLoginResponse = {
  accessToken: string;
  user: {
    _id: string;
    username: string;
    email: string;
    role: string;
  };
};

export type TRegisterRequest = z.TypeOf<typeof RegisterSchema>;
