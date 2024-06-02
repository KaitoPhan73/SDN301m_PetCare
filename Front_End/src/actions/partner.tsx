import { httpInvoice } from "@/lib/http";
import { TPartnersBase } from "@/types/Partner";
import { TTableResponse } from "@/types/Table";

const getPartners = async (sessionToken: string, params?: any) => {
  "use server";
  return httpInvoice.get<TTableResponse<TPartnersBase>>("partners", {
    params,
    headers: { Authorization: `Bearer ${sessionToken}` },
  });
};

const PartnersApi = {
  getPartners,
};

export default PartnersApi;
