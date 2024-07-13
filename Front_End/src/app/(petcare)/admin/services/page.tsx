import ServiceApi from "@/actions/service";
import userApi from "@/actions/users";
import FeedBackManagementPage from "@/page/dashboard/feedbackManagement";
import ServiceManagementPage from "@/page/dashboard/serviceManagement";
import UserManagementPage from "@/page/dashboard/userManagement";
import { cookies } from "next/headers";
import React from "react";

export default async function Admin(props: any) {
  const params = {
    page: props.searchParams.page ? +props.searchParams.page : 1,
    limit: props.searchParams.limit ? +props.searchParams.limit : 10,
  };
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const response = await ServiceApi.getServices(accessToken!, params);

  return (
    <>
      <ServiceManagementPage props={props} data={response.payload} />
    </>
  );
}
