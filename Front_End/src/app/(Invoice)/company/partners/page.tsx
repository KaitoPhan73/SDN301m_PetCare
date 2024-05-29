import PartnersApi from "@/actions/partner";
import PartnersPage from "@/page/partners";
import { cookies } from "next/headers";
import React from "react";

export default async function Partners(props: any) {
  const params = {
    page: props.searchParams.page ? +props.searchParams.page : 1,
    size: props.searchParams.size ? +props.searchParams.size : 10,
  };
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const response = await PartnersApi.getPartners(accessToken!, params);

  return (
    <>
      <PartnersPage props={props} data={response.payload} />
    </>
  );
}
