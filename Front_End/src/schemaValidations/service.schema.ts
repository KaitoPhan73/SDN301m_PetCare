import { z } from "zod";

export const ServiceSchema = z.object({
  description: z.string(),
  name: z.string(),
  price: z.number(),
  image: z.string().url(),
});

export type TServiceRequest = z.TypeOf<typeof ServiceSchema>;

export type TServiceResponse = TServiceRequest & {
  _id: string;
  createdAt: string;
  updatedAt: string;
};
