import { httpInvoice } from "@/lib/http";
import { TStoresBase } from "@/types/Strore";
import { TTableResponse } from "@/types/Table";

const getStores = async (sessionToken: string, params?: any) => {
  "use server";
  return httpInvoice.get<TTableResponse<TStoresBase>>("stores", {
    params,
    headers: { Authorization: `Bearer ${sessionToken}` },
  });
};

const StoresApi = {
  getStores,
};

export default StoresApi;
