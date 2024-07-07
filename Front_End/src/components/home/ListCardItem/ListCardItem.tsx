import React, { useEffect, useState } from "react";
import Heading from "../Item/Heading";
import Room from "../Item/Package";
import { TPackageResponse } from "@/schemaValidations/package.schema";
import Package from "../Item/Package";

type Props = {
  dataSource: any[];
};
const ListCardItem = ({ dataSource }: Props) => {
  return (
    <div className="w-full pb-20">
      <Heading heading="TOP SERVICES POPULATION" />
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lgl:grid-cols-3 xl:grid-cols-4 gap-10">
        {dataSource.map((data: TPackageResponse) => (
          <Package props={data} />
        ))}
      </div>
    </div>
  );
};

export default ListCardItem;
