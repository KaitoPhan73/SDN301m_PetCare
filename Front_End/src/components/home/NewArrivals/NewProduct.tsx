"use client";
import React from "react";
import Slider from "react-slick";
import Heading from "../Item/Heading";
import Product from "../Item/Item";
import SampleNextArrow from "./SampleNextArrow";
import SamplePrevArrow from "./SamplePrevArrow";
import { User } from "@/types/User";
type Props = {
  dataSource: any;
};

const NewProducts = ({ dataSource }: Props) => {
  console.log("dataSource", dataSource);
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
    <div className="w-full pb-16">
      <Heading heading="New Arrivals" />
      <Slider {...settings}>
        {dataSource.map((data: User) => (
          <div className="px-2">
            <Product props={data} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default NewProducts;
