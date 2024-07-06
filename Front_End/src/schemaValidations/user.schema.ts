import { z } from "zod";

export const UserSchema = z.object({
  _id: z.string(),
  username: z.string(),
  email: z.string(),
  role: z.string(),
  status: z.boolean(),
});

export type IUser = z.TypeOf<typeof UserSchema>;
