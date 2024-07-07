import PackageApi from "@/actions/package";
import ShopPage from "@/page/shop";
import React from "react";

export default async function Product(props: any) {
  const params = {
    page: props.searchParams.page ? props.searchParams.page : 1,
    limit: props.searchParams.pageSize ? props.searchParams.pageSize : 10,
    ...(props.searchParams.minPrice && {
      minPrice: parseFloat(props.searchParams.minPrice),
    }),
    ...(props.searchParams.maxPrice && {
      maxPrice: parseFloat(props.searchParams.maxPrice),
    }),
  };
  const data = await PackageApi.getPackages(params);
  return <ShopPage data={data.payload} props={props} />;
}
