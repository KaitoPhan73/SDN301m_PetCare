import ServiceApi from "@/actions/service";
import CreatePackagePage from "@/page/dashboard/packageManagement/create";
import React from "react";
import { TServiceResponse } from "@/schemaValidations/service.schema";
import { cookies } from "next/headers";

export default async function createPackage(props: any) {
  const params = {
    page: props.searchParams.page ? +props.searchParams.page : 1,
    limit: props.searchParams.limit ? +props.searchParams.limit : 10,
  };
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const response1 = await ServiceApi.getServices(accessToken!, params);

  return <CreatePackagePage props={props} data1={response1.payload.items} />;
}
