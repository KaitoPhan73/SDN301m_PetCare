import { TProduct } from "@/schemaValidations/product.schema";

export type TCart = {
  items: TItem[];
};

export type TItem = {
  product: TProduct;
  quantity: number;
};
