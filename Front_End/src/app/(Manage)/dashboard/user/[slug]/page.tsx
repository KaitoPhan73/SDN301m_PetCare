import userApi from "@/actions/users";
import EditUser from "@/page/users/edit";
import React from "react";

export default async function UserDetail({ params }: { params: { slug: string } }) {
  const response = await userApi.getUser(params.slug);
  console.log(response.payload);
  

  return <div><EditUser user={response?.payload}/></div>;
}
