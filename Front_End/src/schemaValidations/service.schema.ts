 import { z } from "zod";

export const ServiceSchema = z.object({
  detail: z.string(),
  description: z.string(),
  name: z.string(),
  price: z.number(),
  image: z.string().url(),
  time: z.number(),
});

export type TServiceRequest = z.TypeOf<typeof ServiceSchema>;

export type TServiceResponse = TServiceRequest & {
  _id: string;
  createdAt: string;
  updatedAt: string;
};
