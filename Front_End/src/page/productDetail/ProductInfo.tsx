"use client";
import React from "react";
import { useDispatch } from "react-redux";
import { User } from "@/types/User";
import { TPackageResponse } from "@/schemaValidations/package.schema";
import { formatPriceVND } from "@/lib/utils";
type Props = {
  data: TPackageResponse;
  handleAdd: () => void;
};
const ProductInfoPage = ({ data, handleAdd }: Props) => {
  const highlightStyle = {
    color: "#d0121a", // Change this to the desired color
    fontWeight: "bold", // Change this to the desired font weight
  };

  const renderDescription = () => {
    if (!data.description) {
      return null; // or handle accordingly if product.des is not defined
    }

    const description = data.description
      .split(/:(.*?)-/)
      .map((part: any, index: any) => {
        return (
          <span key={index} style={index % 2 === 1 ? highlightStyle : {}}>
            {part}
          </span>
        );
      });

    return <>{description}</>;
  };
  const dispatch = useDispatch();
  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-4xl font-semibold">{data.name}</h2>
      <p className="text-2xl font-semibold">
        {formatPriceVND(data.price)}
        {data.discount > 0 && (
          <>
            <span className="text-xl font-semibold line-through ml-2">
              {formatPriceVND(data.price + data.discount * data.price)}
            </span>
            <span className="text-xs ml-2 inline-flex items-center px-3 py-1 rounded-full bg-green-600 text-white">
              Save {data.discount}
            </span>
          </>
        )}
      </p>
      <hr />
      <button
        onClick={() => handleAdd()}
        className="w-full py-4 bg-blue-500 hover:bg-blue-600 duration-300 text-white text-lg font-titleFont"
      >
        Booking Now
      </button>
      <p className="text-base text-gray-600">{renderDescription()}</p>
    </div>
  );
};

export default ProductInfoPage;
