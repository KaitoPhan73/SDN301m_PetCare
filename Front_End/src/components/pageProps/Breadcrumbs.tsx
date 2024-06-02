import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { HiOutlineChevronRight } from "react-icons/hi";
type Prop = {
  prevLocation?: string;
  title: string;
};

const Breadcrumbs = ({ prevLocation, title }: Prop) => {
  const pathname = usePathname();
  const [locationPath, setLocationPath] = useState("");
  useEffect(() => {
    setLocationPath(pathname.split("/")[1]);
  }, [pathname]);

  return (
    <div className="w-full py-10 xl:py-10 flex flex-col gap-3">
      <h1 className="text-5xl text-primeColor font-titleFont font-bold">
        {title}
      </h1>
      <p className="text-sm font-normal text-lightText capitalize flex items-center">
        <span> {prevLocation === "" ? "Home" : prevLocation}</span>

        <span className="px-1">
          <HiOutlineChevronRight />
        </span>
        <span className="capitalize font-semibold text-primeColor">
          {locationPath}
        </span>
      </p>
    </div>
  );
};

export default Breadcrumbs;
