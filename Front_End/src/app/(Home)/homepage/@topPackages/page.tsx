import PackageApi from "@/actions/package";
import ListCardItem from "@/components/home/ListCardItem/ListCardItem";
import HomePage from "@/page/home";
import React from "react";

const TopPackages = async (props: any) => {
  const params = {
    page: 1,
    limit: 4,
  };

  const data = await PackageApi.getPackages(params);
  return <ListCardItem dataSource={data.payload.items} />;
};
export default TopPackages;
