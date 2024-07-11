import { z } from "zod";
import { ServiceSchema } from "./service.schema";

export const PackageSchema = z.object({
  // detail: z.string(),
  description: z.string(),
  name: z.string(),
  price: z.number(),
  image: z.array(z.string().url()),
  services: z.array(ServiceSchema),
  discount: z.number().min(0).max(100).optional(),
});

export type TPackageRequest = z.infer<typeof PackageSchema> & {
  discount: number;
};

export type TPackageResponse = TPackageRequest & {
  _id: string;
  totalTime: number;
  createdAt: string;
  updatedAt: string;
};

export const CreatePakageBody = z.object({
  description: z.string(),
  name: z.string(),
  price: z.number(),
  image: z.string().url(),
  services: z.array(ServiceSchema),
  discount: z.number().min(0).max(100).optional(),
});

export type TCreatePackageRequest = z.TypeOf<typeof CreatePakageBody>;

export type TCreatePackageResponse = TCreatePackageRequest & {
  _id: string;
  totalTime: number;
  createdAt: string;
  updatedAt: string;
};
