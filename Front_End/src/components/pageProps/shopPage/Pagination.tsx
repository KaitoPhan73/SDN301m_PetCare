"use client";
import Item from "@/components/home/Item/Item";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { useSelector } from "react-redux";
type Props = {
  dataSource: any[];
  props?: any;
};
function Items({ dataSource }: Props) {
  return (
    <>
      {dataSource.map((item: any) => (
        <div key={item.id} className="w-full">
          <Item props={item} />
        </div>
      ))}
    </>
  );
}

const Pagination = ({ dataSource, props }: Props) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [itemOffset, setItemOffset] = useState(0);
  const [itemStart, setItemStart] = useState(1);

  const endOffset = itemOffset + 10;
  const pageCount = 5;
  //Math.ceil(dataSource.length / 10)

  const handlePageClick = (event: any) => {
    const currentPage = isNaN(Number(event.selected.toString()))
      ? 1
      : Number(event.selected.toString()) + 1;

    const newOffset = (currentPage * 10) % dataSource.length;

    setItemOffset(newOffset);
    setItemStart(currentPage);
    const params = new URLSearchParams(searchParams);
    params.set("page", currentPage.toString());
    replace(`${pathname}?${params.toString()}`);
  };
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 mdl:gap-4 lg:gap-10">
        <Items dataSource={dataSource} />{" "}
      </div>
      <div className="flex  mdl:flex-row justify-evenly mdl:space-evenly items-center">
        <ReactPaginate
          nextLabel=""
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel=""
          pageLinkClassName="w-9 h-9 border-[1px] border-lightColor hover:border-gray-500 duration-300 flex justify-center items-center"
          pageClassName="mr-6"
          containerClassName="flex text-base font-semibold font-titleFont py-10"
          activeClassName="bg-black text-white"
          initialPage={Number(props.searchParams.page) - 1}
        />

        <p className="text-base font-normal text-lightText">
          Products from {itemStart} to {Math.min(endOffset, dataSource.length)}{" "}
          of {dataSource.length}
        </p>
      </div>
    </div>
  );
};

export default Pagination;
