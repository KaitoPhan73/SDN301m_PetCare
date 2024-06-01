import { httpInvoice } from "@/lib/http";
import { TInvoice } from "@/types/Invoice";
import { TTableResponse } from "@/types/Table";

const getInvoices = async (sessionToken: string, params?: any) => {
  "use server";
  return httpInvoice.get<TTableResponse<TInvoice>>("invoices", {
    params,
    headers: { Authorization: `Bearer ${sessionToken}` },
  });
};

const InvoiceApi = {
  getInvoices,
};

export default InvoiceApi;
