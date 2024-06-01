import React, { useEffect, useState } from "react";
import Heading from "../Item/Heading";
import Item from "../Item/Item";
import { TProduct } from "@/schemaValidations/product.schema";

type Props = {
  dataSource: any[];
};
const ListCartItem = ({ dataSource }: Props) => {
  return (
    <div className="w-full pb-20">
      <Heading heading="Special Offers" />
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lgl:grid-cols-3 xl:grid-cols-4 gap-10">
        {dataSource.map((data: TProduct) => (
          <Item props={data} />
        ))}
      </div>
    </div>
  );
};

export default ListCartItem;
