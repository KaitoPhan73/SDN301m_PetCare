import { z } from "zod";

export const UserSchema = z.object({
  // _id: z.string(),
  username: z.string({ required_error: "Username is required" }),
  email: z.string({ required_error: "Email is required" }),
  role: z.string({ required_error: "Role is required" }),
  status: z.boolean({ required_error: "Status is required" }),
});

export type TUserRequest = z.TypeOf<typeof UserSchema>;

export type TUserResponse = TUserRequest & {
  _id: string;
};
