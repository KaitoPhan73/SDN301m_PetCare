
import FeedBacksApi from "@/actions/feedbacks";
import FeedBackManagementPage from "@/page/dashboard/feedbackManagement";
import { cookies } from "next/headers";
import React from "react";

export default async function Feedback(props: any) {
  const params = {
    page: props.searchParams.page ? +props.searchParams.page : 1,
    limit: props.searchParams.limit ? +props.searchParams.limit : 10,
  };
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const response = await FeedBacksApi.getFeedbacks(params);
  // console.log("eeee:",response.payload); 

  return (
    <>
      <FeedBackManagementPage props={props} data={response.payload} /> 
    </>
  );
}
