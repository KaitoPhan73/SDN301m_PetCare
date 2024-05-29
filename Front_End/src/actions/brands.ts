import { httpInvoice } from "@/lib/http";
import { TBrandBody } from "@/schemaValidations/brand.schema";
import { TBrandBase } from "@/types/Brand";
import { TTableResponse } from "@/types/Table";

// const getBrands = async (sessionToken: string, params?: any) => {
//   "use server";
//   return httpInvoice.get<TTableResponse<TBrandBase>>("brands", {
//     params,
//     headers: { Authorization: `Bearer ${sessionToken}` },
//   });
// };
// const createBrand = async (data: TBrandBody) => {
//   " use server";
//   return httpInvoice.post<TBrandBody>("brands", data);
// };

const brandApi = {
  getBrands: (sessionToken: string, params?: any) => {
    return httpInvoice.get<TTableResponse<TBrandBase>>("brands", {
      params,
      headers: { Authorization: `Bearer ${sessionToken}` },
    });
  },
  createBrand: (data: TBrandBody) => {
    return httpInvoice.post<TBrandBody>("brands", data);
  },
};

export default brandApi;
