import productApi from "@/actions/product";
import userApi from "@/actions/users";
import ShopPage from "@/page/shop";
import React from "react";

export default async function Product(props: any) {
  const params = {
    page: props.searchParams.page ? props.searchParams.page : 1,
    limit: props.searchParams.pageSize ? props.searchParams.pageSize : 10,
  };
  const data = await productApi.getProducts(params);
  return <ShopPage data={data.payload} props={props} />;
}
