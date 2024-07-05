import React from "react";
import ItemPackagePage from "./detail/DetailService";

type Props = {
  dataSource: any;
};
const ProductsOnSale = ({ dataSource }: Props) => {
  return (
    <div>
      <h3 className="font-titleFont text-xl font-semibold mb-6 underline underline-offset-4 decoration-[1px]">
        Các dịch vụ
      </h3>
      <div className="flex flex-col gap-2">
        {dataSource.map((item: any) => (
          <ItemPackagePage data={item} key={item._id} />
        ))}
      </div>
    </div>
  );
};

export default ProductsOnSale;
