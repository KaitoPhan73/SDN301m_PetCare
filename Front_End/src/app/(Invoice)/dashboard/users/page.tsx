import userApi from "@/actions/users";
import UserPage from "@/page/users";
import React from "react";
import { any } from "zod";

const Users = async (props: any) => {
  // const res = await fetch(
  //   `https://660bbdb3ccda4cbc75dd950a.mockapi.io/api/student/users`,
  //   {
  //     method: "GET",
  //     cache: "no-store",
  //   }
  // );
  return <UserPage props={props} data={any} />;
};
export default Users;
