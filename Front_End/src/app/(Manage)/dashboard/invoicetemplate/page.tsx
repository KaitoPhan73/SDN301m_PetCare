import getInvoiceTemplateApi from "@/actions/invoicetemplate";
import InvoiceTemplatePage from "@/page/invoiceTemplate";
import { cookies } from "next/headers";
import React from "react";

export default async function InvoiceTemplate(props: any) {
  const params = {
    page: props.searchParams.page ? +props.searchParams.page : 1,
    size: props.searchParams.size ? +props.searchParams.size : 10,
  };
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const response = await getInvoiceTemplateApi.getInvoiceTemplate(
    accessToken!,
    params
  );

  return (
    <>
      <InvoiceTemplatePage props={props} data={response.payload} />
    </>
  );
}
