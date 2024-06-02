import PartnersApi from "@/actions/partner";
import StoresApi from "@/actions/store";
import StoresPage from "@/page/stores";
import { cookies } from "next/headers";
import React from "react";

export default async function Stores(props: any) {
  const params = {
    page: props.searchParams.page ? +props.searchParams.page : 1,
    size: props.searchParams.size ? +props.searchParams.size : 10,
  };
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const response = await StoresApi.getStores(accessToken!, params);

  return (
    <>
      <StoresPage props={props} data={response.payload} />
    </>
  );
}
