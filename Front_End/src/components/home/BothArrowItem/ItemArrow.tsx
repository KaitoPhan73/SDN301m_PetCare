"use client";
import React from "react";
import Slider from "react-slick";
import Heading from "../Item/Heading";
import Item from "../Item/Item";
import SampleNextArrow from "./SampleNextArrow";
import SamplePrevArrow from "./SamplePrevArrow";
import ItemRoom from "../Item/Item-room";
type Props = {
  dataSource: any;
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
    <div className="w-full pb-16">
      <Heading heading="ROOMS" />
      <Slider {...settings}>
        {dataSource.map((data: any) => (
          <div className="px-2">
            <ItemRoom props={data} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ItemArrow;
