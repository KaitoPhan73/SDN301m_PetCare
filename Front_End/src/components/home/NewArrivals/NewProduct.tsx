"use client";

import React from "react";
import Slider from "react-slick";
import Heading from "../Item/Heading";
import Product from "../Item/Item";
import SampleNextArrow from "@/components/home/BothArrowItem/SampleNextArrow";
import SamplePrevArrow from "@/components/home/BothArrowItem/SamplePrevArrow";
import { TProductResponse } from "@/schemaValidations/product.schema";

type Props = {
  dataSource: TProductResponse[];
};

const NewProducts = ({ dataSource }: Props) => {
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
        {dataSource.map((data: TProductResponse) => (
          <div key={data._id} className="px-2">
            <Product props={data} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default NewProducts;
