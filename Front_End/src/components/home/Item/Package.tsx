"use client";
import React, { useState } from "react";
import { BsSuitHeartFill } from "react-icons/bs";
import { GiReturnArrow } from "react-icons/gi";
import { FaShoppingCart } from "react-icons/fa";
import { MdOutlineLabelImportant } from "react-icons/md";
import Image from "@/components/designLayouts/Image";
import Badge from "./Badge";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { formatPriceVND } from "@/lib/utils";
interface Props {
  props: any;
}

const Package = ({ props }: Props) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const id = props._id;
  const handleProductDetails = () => {
    router.push(`/product/${id}`);
  };

  return (
    <div className="w-full relative group">
      <div className="max-w-80 max-h-80 relative overflow-y-hidden">
        <div className="relative">
          <Image className="w-full h-full" imgSrc={props.image} />
          <div className="absolute top-6 left-8">
            {true && <Badge text="New" />}
          </div>
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              className="rounded-full w-full max-w-[150px] py-3 text-center justify-center items-center bg-black font-semibold text-lg text-white flex transition-all duration-500 hover:bg-gray-200 hover:text-black"
              onClick={handleProductDetails}
            >
              <span className="px-2">View Details</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-80 py-6 flex flex-col gap-1 border-[1px] border-t-0 px-4">
        <div className="flex items-center justify-between font-titleFont">
          <h2 className="text-lg text-primeColor font-bold truncate">
            {props.name}
          </h2>
          <p className="text-[#767676] text-[14px]">
            {formatPriceVND(props.price)}
          </p>
        </div>
        <div>
          <p className="text-[#767676] text-[14px]">{props.status}</p>
        </div>
      </div>
    </div>
  );
};

export default Package;
