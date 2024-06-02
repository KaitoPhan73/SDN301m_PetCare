import getInvoiceTemplateApi from "@/actions/invoicetemplate";
import OrganizationsApi from "@/actions/organizations";
import InvoiceTemplatePage from "@/page/invoiceTemplate";
import OrganizationsPage from "@/page/organization";
import { cookies } from "next/headers";
import React from "react";

export default async function Organizations(props: any) {
  const params = {
    page: props.searchParams.page ? +props.searchParams.page : 1,
    size: props.searchParams.size ? +props.searchParams.size : 10,
  };
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const response = await OrganizationsApi.getOrganizations(
    accessToken!,
    params
  );

  return (
    <>
      <OrganizationsPage props={props} data={response.payload} />
    </>
  );
}
