import { z } from "zod";

const ProductSchema = z.object({
  name: z.string(),
  title: z.string(),
  image: z.string().url(),
  price: z.number(),
  stock: z.number(),
  description: z.string(),
  categoryId: z.string(),
  id: z.string(),
});

export type TProductRequest = z.TypeOf<typeof ProductSchema>;

export type TProductResponse = TProductRequest & {
  _id: string;
  createdAt: string;
  updatedAt: string;
};
