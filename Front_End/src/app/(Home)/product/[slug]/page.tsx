import userApi from "@/actions/users";
import ProductDetailPage from "@/page/productDetail/ProductDetail";
import React from "react";

export default async function ProductDetail(props: any) {
  const { slug } = props.params;
  const response = await userApi.getUser(slug);
  return <ProductDetailPage data={response.payload} />;
}
