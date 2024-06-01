import productApi from "@/actions/product";
import userApi from "@/actions/users";
import HomePage from "@/page/home";
import React from "react";

const Users = async (props: any) => {
  const params = {
    page: props.searchParams.page ? props.searchParams.page : 1,
    limit: props.searchParams.limit ? props.searchParams.limit : 10,
  };
  const data = await productApi.getProducts(params);
  return <HomePage data={data.payload} />;
};
export default Users;
