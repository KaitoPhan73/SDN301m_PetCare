import { httpInvoice, httpMock } from "@/lib/http";
import { TTableResponse } from "@/types/Table";
import { TUserBase } from "@/types/User";
import { get } from "lodash";

const productApi = {
  getProducts: (params?: any) => {
    return httpInvoice.get<TTableResponse<TUserBase>>("/products", {
      params,
    });
  },
  getProduct: (id: string) => {
    return httpInvoice.get<TUserBase>(`/product`);
  },
};

export default productApi;
