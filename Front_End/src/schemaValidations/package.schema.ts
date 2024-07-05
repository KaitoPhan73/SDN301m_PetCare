import { z } from "zod";
import { ServiceSchema } from "./service.schema";

export const PackageSchema = z.object({
  description: z.string(),
  name: z.string(),
  price: z.number(),
  images: z.array(z.string().url()),
  services: z.array(ServiceSchema),
  discount: z.number().min(0).max(100).optional(),
});

export type TPackageRequest = z.TypeOf<typeof PackageSchema> & {
  discount: number;
};

export type TPackageResponse = TPackageRequest & {
  _id: string;
  createdAt: string;
  updatedAt: string;
};
