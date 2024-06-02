import InvoiceApi from "@/actions/invoices";
import InvoicePage from "@/page/invoice";
import { cookies } from "next/headers";
import React from "react";

export default async function Invoice(props: any) {
  const params = {
    page: props.searchParams.page ? +props.searchParams.page : 1,
    size: props.searchParams.size ? +props.searchParams.size : 10,
  };
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const response = await InvoiceApi.getInvoices(accessToken!, params);

  return (
    <>
      <InvoicePage props={props} data={response.payload} />
    </>
  );
}
