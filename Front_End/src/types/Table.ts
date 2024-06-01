export type TTableResponse<T> = {
  items: T[];
  page: number;
  size: number;
  total: number;
  totalPages: number;
};
