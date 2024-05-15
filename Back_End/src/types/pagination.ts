import { Request } from "express";
export interface TPagination<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
