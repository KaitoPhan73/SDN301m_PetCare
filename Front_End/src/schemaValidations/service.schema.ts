 import { z } from "zod";

export const ServiceSchema = z.object({
  // detail: z.string(),
  id: z.string(),
  description: z.string(),
  name: z.string(),
  price: z.number(),
  image: z.string().url(),
  time: z.number(),
});

export type TServiceRequest = z.TypeOf<typeof ServiceSchema>;

export const CreateServiceBody = z.object({
  id: z.string(),
  description: z.string(),
  name: z.string(),
  price: z.number(),
  image: z.string().url(),
  time: z.number(),
});

export type TCreateServiceRequest = z.TypeOf<typeof CreateServiceBody>;


export type TServiceResponse = TServiceRequest & {
  _id: string;
  createdAt: string;
  updatedAt: string;
};

export type TCreateServiceResponse = TCreateServiceRequest & {
  _id: string;
  createdAt: string;
  updatedAt: string;
};