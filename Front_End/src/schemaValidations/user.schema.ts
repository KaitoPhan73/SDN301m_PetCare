import { z } from "zod";

const UserSchema = z.object({
  id: z.string(),
  username: z.string(),
  password: z.string(),
  email: z.string().email(),
  status: z.string(),
  role: z.string(),
});

export type TUser = z.infer<typeof UserSchema>;
