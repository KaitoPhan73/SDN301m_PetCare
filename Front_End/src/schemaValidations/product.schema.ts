import { z } from "zod";

const ProductSchema = z.object({
  createdAt: z.string(),
  name: z.string(),
  title: z.string(),
  image: z.string().url(),
  price: z.number(),
  stock: z.number(),
  description: z.string(),
  categoryId: z.string(),
  id: z.string(),
});

export type TProduct = z.TypeOf<typeof ProductSchema>;
