import React from "react";
import { Container } from "@mui/material";
import Banner from "./Banner";
import ItemArrow from "@/components/home/BothArrowItem/ItemArrow";
import ListCartItem from "@/components/home/ListCardItem/ListCartItem";
type Prop = {
  data: any;
};

export default function HomePage({ data }: Prop) {
  return (
    <div className="w-full mx-auto">
      <Banner />
      <div className="max-w-container mx-auto px-40 pt-20">
        <ListCartItem dataSource={data} />
        <ItemArrow dataSource={data} />
      </div>
    </div>
  );
}
