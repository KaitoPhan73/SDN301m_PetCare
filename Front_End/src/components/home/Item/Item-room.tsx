"use client";
import React from "react";

import { MdOutlineLabelImportant } from "react-icons/md";
import Image from "@/components/designLayouts/Image";
import Badge from "./Badge";

import { useRouter } from "next/navigation";

import { TProductResponse } from "@/schemaValidations/product.schema";
import { formatPriceVND } from "@/lib/utils";
interface Props {
  props: TProductResponse;
}

const ItemRoom = ({ props }: Props) => {
  const router = useRouter();
  const id = props._id;
  const handleProductDetails = () => {
    router.push(`/product/${id}`);
  };

  return (
    <div className="w-full relative group">
      <div className="max-w-80 max-h-80 relative overflow-y-hidden ">
        {/* <div onClick={handleProductDetails}> */}
        <div>
          <Image className="w-full h-full" imgSrc={props.image} />
        </div>
        <div className="absolute top-6 left-8 bg-black">
          {true && <Badge text="New" />}
        </div>
      </div>
      <div className="max-w-80 py-6 flex flex-col gap-1 border-[1px] border-t-0 px-4">
        <div className="flex items-center justify-between font-titleFont">
          <h2 className="text-lg text-primeColor font-bold">{props.name}</h2>
          <p className="text-[#767676] text-[14px]">
            {formatPriceVND(props.price)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ItemRoom;
