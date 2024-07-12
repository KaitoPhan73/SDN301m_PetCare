
import PackageApi from "@/actions/package";
import ServiceApi from "@/actions/service";
import userApi from "@/actions/users";
import FeedBackManagementPage from "@/page/dashboard/feedbackManagement";
import PackageManagementPage from "@/page/dashboard/packageManagement";
import UserManagementPage from "@/page/dashboard/userManagement";
import { cookies } from "next/headers";
import React from "react";

export default async function PackageAdmin(props: any) {
  const params = {
    page: props.searchParams.page ? +props.searchParams.page : 1,
    limit: props.searchParams.limit ? +props.searchParams.limit : 10,
  };
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const response = await PackageApi.getPackages(params);
  const response1 = await ServiceApi.getServices(params);

  // console.log("dataaaaa:",response.payload.items);

  return (
    <>
      <PackageManagementPage props={props} data={response.payload} data1={response1.payload}/> 
    </>
  );
}
