"use client";
import Breadcrumbs from "@/components/pageProps/Breadcrumbs";
import Pagination from "@/components/pageProps/shopPage/Pagination";
import ProductBanner from "@/components/pageProps/shopPage/ProductBanner";
import ShopSideNav from "@/components/pageProps/shopPage/ShopSideNav";
import React from "react";
type Prop = {
  data: any;
  props: any;
};

export default function ShopPage({ data, props }: Prop) {
  return (
    <div className="max-w-container mx-auto px-20">
      <Breadcrumbs title="Products" />
      <div className="w-full h-full flex pb-20 gap-10">
        <div className="w-[20%] lgl:w-[25%] mdl:inline-flex h-full">
          <ShopSideNav />
        </div>
        <div className="w-full mdl:w-[80%] lgl:w-[75%] h-full flex flex-col gap-10">
          <ProductBanner />
          <Pagination dataSource={data} props={props} />
        </div>
      </div>
    </div>
  );
}
