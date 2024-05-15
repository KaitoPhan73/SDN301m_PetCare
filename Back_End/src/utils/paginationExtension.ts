import { Model } from "mongoose";
import { TPagination } from "../types/pagination";

interface IPaginateOptions {
  page?: number;
  limit?: number;
  [key: string]: any;
}

export async function paginate<T>(
  model: Model<T>,
  options: IPaginateOptions
): Promise<TPagination<T>> {
  const page = options.page ?? 1;
  const limit = options.limit ?? 10;

  const skip = (page - 1) * limit;

  const filters = { ...options };
  delete filters.page;
  delete filters.limit;

  const query = Object.keys(filters).length ? filters : {};

  for (const key in filters) {
    if (Object.prototype.hasOwnProperty.call(filters, key)) {
      if (typeof filters[key] === "string") {
        filters[key] = { $regex: new RegExp(filters[key], "i") };
      }
    }
  }

  const [items, total] = await Promise.all([
    model.find(query).skip(skip).limit(limit).exec(),
    model.countDocuments(query).exec(),
  ]);

  const totalPages = Math.ceil(total / limit);

  return {
    items,
    total,
    page,
    limit,
    totalPages,
  };
}
