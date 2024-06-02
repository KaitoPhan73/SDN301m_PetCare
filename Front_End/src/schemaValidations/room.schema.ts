import { z } from "zod";

const RoomSchema = z.object({
  roomNo: z.number(),
  name: z.string(),
  type: z.string(),
  price: z.number(),
  status: z.boolean(),
});

export type TRoom = z.TypeOf<typeof RoomSchema>;
