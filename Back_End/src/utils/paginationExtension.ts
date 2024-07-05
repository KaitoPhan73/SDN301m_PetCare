import { Model, Document, FilterQuery } from "mongoose";
import { TPagination } from "../types/pagination";

interface IPopulateOptions {
  path: string;
  select?: string;
  model?: Model<Document>;
}

interface IPaginateOptions {
  page?: number;
  limit?: number;
  populate?: IPopulateOptions | IPopulateOptions[] | string | string[];
  minPrice?: number;
  maxPrice?: number;
  [key: string]: any;
}

// Define a custom type for filters
type CustomFilters<T> = FilterQuery<T> & {
  price?: { $gte?: number; $lte?: number };
};

function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // Escapes special characters
}

export async function paginate<T>(
  model: Model<T>,
  options: IPaginateOptions
): Promise<TPagination<T>> {
  const page = options.page ?? 1;
  const limit = options.limit ?? 10;
  const { populate, minPrice, maxPrice, ...restFilters } = options;

  // Define filters using CustomFilters<T>
  const filters: CustomFilters<T> = { ...restFilters };

  console.log("aacxcxc", filters);
  // Apply price range filters if minPrice or maxPrice are provided
  if (minPrice !== undefined || maxPrice !== undefined) {
    filters.price = {};
    if (minPrice !== undefined) {
      filters.price.$gte = minPrice;
    }
    if (maxPrice !== undefined) {
      filters.price.$lte = maxPrice;
    }
  }

  // Remove non-filter options from the query
  delete filters.page;
  delete filters.limit;
  delete filters.minPrice;
  delete filters.maxPrice;

  const filterObject = filters as { [key: string]: any };
  for (const key in filterObject) {
    if (Object.prototype.hasOwnProperty.call(filterObject, key)) {
      // Convert "true" and "false" strings to boolean
      if (filterObject[key] === "true") {
        filterObject[key] = true;
      } else if (filterObject[key] === "false") {
        filterObject[key] = false;
      }

      // Apply regex for string values
      if (typeof filterObject[key] === "string") {
        const escapedString = escapeRegExp(filterObject[key]);
        filterObject[key] = { $regex: new RegExp(escapedString, "i") };
      }
    }
  }

  // Calculate number of documents to skip
  const skip = (page - 1) * limit;
  // Fetch items and total count in parallel
  const [items, total] = await Promise.all([
    model
      .find(filters)
      .sort({ createdAt: -1 })
      .populate(
        populate instanceof Array ? populate : populate ? [populate] : []
      )
      .exec(),
    model.countDocuments(filters),
  ]);

  const paginatedItems = items.slice(skip, skip + limit);

  // Calculate total number of pages
  const totalPages = Math.ceil(total / limit);

  // Return paginated result
  return {
    items: paginatedItems,
    total,
    page,
    limit,
    totalPages,
  };
}
