import { httpInvoice, httpMock } from "@/lib/http";
import { TInvoiceTemplateBase } from "@/types/InvoiceTemplate";
import { TTableResponse } from "@/types/Table";
import { TUserBase } from "@/types/User";

const getInvoiceTemplate = async (sessionToken: string, params?: any) => {
  "use server";
  return httpInvoice.get<TTableResponse<TInvoiceTemplateBase>>("templates", {
    params,
    headers: { Authorization: `Bearer ${sessionToken}` },
  });
};

const getInvoiceTemplateApi = {
  getInvoiceTemplate,
};

export default getInvoiceTemplateApi;
