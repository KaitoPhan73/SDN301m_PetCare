import { z } from "zod";
import { ServiceSchema } from "./service.schema";

export const PackageSchema = z.object({
  // detail: z.string(),
  description: z.string(),
  name: z.string(),
  price: z.string(),
  image: z.string().url(),
  services: z.array(ServiceSchema),
  discount: z.string().min(0).max(100).optional(),
});

export type TPackageRequest = z.infer<typeof PackageSchema> & {
  discount: string;
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
  price: z.string(),
  image: z.string().url(),
  services: z.array(ServiceSchema),
  discount: z.string().min(0).max(100).optional(),
});

export type TCreatePackageRequest = z.TypeOf<typeof CreatePakageBody>;

export type TCreatePackageResponse = TCreatePackageRequest & {
  _id: string;
  discount: string;
  totalTime: string;
  createdAt: string;
  updatedAt: string;
};
