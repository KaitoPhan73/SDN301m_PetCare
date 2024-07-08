import React from "react";
import Package from "../Item/Package";
import { TPackageResponse } from "@/schemaValidations/package.schema";

type Props = {
  dataSource: TPackageResponse[];
};

const ListCardItem: React.FC<Props> = ({ dataSource }) => {
  return (
    <div className="w-full pb-20">
      <h2 className="text-2xl font-bold mb-6 text-center bg-slate-50 text-black py-4 rounded-lg border border-primary-dark">
        TOP SERVICES POPULATION
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
        {dataSource.map((data) => (
          <div
            key={data._id}
            className="group relative bg-white rounded-2xl p-4 transition duration-300 ease-in-out transform hover:scale-105 hover:bg-gray-50"
          >
            <Package props={data} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListCardItem;
