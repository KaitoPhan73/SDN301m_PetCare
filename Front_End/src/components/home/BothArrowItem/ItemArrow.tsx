"use client";

import React from "react";
import Slider from "react-slick";
import Heading from "../Item/Heading";
import Item from "../Item/Item";
import SampleNextArrow from "./SampleNextArrow";
import SamplePrevArrow from "./SamplePrevArrow";
import { TProductResponse } from "@/schemaValidations/product.schema";
import ItemRoom from "../Item/Item-room";
type Props = {
  dataSource: TProductResponse[];
};

const ItemArrow = ({ dataSource }: Props) => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };

  return (
    <div className="w-full pb-20">
      <h2 className="text-2xl font-bold mb-6 text-center bg-slate-50 text-black py-4 rounded-lg border border-primary-dark">
        ROOMS
      </h2>
      <Slider {...settings}>
        {dataSource.map((data: TProductResponse, index: number) => (
          <div key={index} className="px-2">
            <Item props={data} />
          </div>
        ))}
        {dataSource.map((data: any, index: number) => (
          <div key={index} className="group relative bg-white rounded-2xl p-4 transition duration-300 ease-in-out transform hover:scale-105 hover:bg-gray-50">
            <ItemRoom props={data} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ItemArrow;
