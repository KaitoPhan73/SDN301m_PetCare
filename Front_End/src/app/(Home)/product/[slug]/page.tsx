import PackageApi from "@/actions/package";
import ProductDetailPage from "@/page/productDetail/ProductDetail";
import React from "react";

export default async function ProductDetail(props: any) {
  const { slug } = props.params;
  const response = await PackageApi.getPackage(slug);
  return <ProductDetailPage data={response.payload} />;
}
