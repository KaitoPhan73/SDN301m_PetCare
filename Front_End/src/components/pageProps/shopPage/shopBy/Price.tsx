"use client";
import React, { useState } from "react";
import NavTitle from "./NavTitle";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
const Price = () => {
  const priceList = [
    {
      _id: 10,
      priceOne: "All",
      priceTwo: "",
    },
    {
      _id: 1,
      priceOne: "<=",
      priceTwo: 100000,
    },
    {
      _id: 101000,
      priceOne: 101000,
      priceTwo: 200000,
    },
    {
      _id: 201000,
      priceOne: 201000,
      priceTwo: 300000,
    },
    {
      _id: 953,
      priceOne: ">=",
      priceTwo: 300000,
    },
  ];
  const [showBrands, setShowBrands] = useState(true);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const filterByPrice = (item: any) => {
    console.log(item.priceOne);
    const params = new URLSearchParams(searchParams);
    if (item.priceOne === "All") {
      params.delete("minPrice");
      params.delete("maxPrice");
      replace(`${pathname}?${params.toString()}`);
    } else if (item.priceOne === ">=") {
      params.delete("maxPrice");
      params.set("minPrice", item.priceTwo.toString());
      replace(`${pathname}?${params.toString()}`);
    } else if (item.priceOne === "<=") {
      params.delete("minPrice");
      params.set("maxPrice", item.priceTwo.toString());
      replace(`${pathname}?${params.toString()}`);
    } else {
      params.set("minPrice", item.priceOne.toString());
      params.set("maxPrice", item.priceTwo.toString());
      replace(`${pathname}?${params.toString()}`);
    }
  };
  return (
    <div>
      <div
        onClick={() => setShowBrands(!showBrands)}
        className="cursor-pointer"
      >
        <NavTitle title="Shop by Price" icons={true} />
      </div>
      {showBrands && (
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ul className="flex flex-col gap-4 text-sm lg:text-base text-[#767676]">
            {priceList.map((item) => (
              <li
                key={item._id}
                className="border-b-[1px] border-b-[#F0F0F0] pb-2 flex items-center gap-2 hover:text-primeColor hover:border-gray-400 duration-300"
                onClick={() => filterByPrice(item)}
              >
                {typeof item.priceOne === "string"
                  ? `${item.priceOne} ${item.priceTwo}`
                  : `${item.priceOne} - ${item.priceTwo}`}
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </div>
  );
};

export default Price;
