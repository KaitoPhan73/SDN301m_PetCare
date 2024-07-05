"use client";
import React from "react";
import { Container } from "@mui/material";
import Banner from "./Banner";
import ItemArrow from "@/components/home/BothArrowItem/ItemArrow";
import ListCardItem from "@/components/home/ListCardItem/ListCardItem";
type Prop = {
  children: React.ReactNode;
};

export default function HomePage({ children }: Prop) {
  return (
    <div className="w-full mx-auto">
      <Banner />
      <div className="max-w-container mx-auto px-40 pt-20">{children}</div>
    </div>
  );
}
