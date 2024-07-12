import ServiceApi from "@/actions/service";
import CreatePackagePage from "@/page/dashboard/packageManagement/create";
import React from "react";

export default async function createPackage(props: any) {
  const params = {
    page: props.searchParams.page ? +props.searchParams.page : 1,
    limit: props.searchParams.limit ? +props.searchParams.limit : 10,
  };
  const response1 = await ServiceApi.getServices(params);

  return <CreatePackagePage  props={props} data1={response1.payload} />;
}