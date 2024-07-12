import ServiceApi from "@/actions/service";
import CreatePackagePage from "@/page/dashboard/packageManagement/create";
import React from "react";
import { TServiceResponse } from "@/schemaValidations/service.schema";

export default async function createPackage(props: any) {
  const params = {
    page: props.searchParams.page ? +props.searchParams.page : 1,
    limit: props.searchParams.limit ? +props.searchParams.limit : 10,
  };
  const response1 = await ServiceApi.getServices(params);
  const services: TServiceResponse[] = response1.payload.items; 

  return <CreatePackagePage props={props} data1={services} />;
}
