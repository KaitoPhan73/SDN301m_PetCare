"use client";

import { Button } from "antd";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navBars = [
  {
    _id: "permission",
    title: "Permission",
    link: "/permission",
  },
];

const Header = () => {
  const pathName = usePathname();
 console.log(pathName)
  return (
    <div className="w-full h-20 bg-white sticky flex justify-between border-b-2 bordder-slate-400">
      <div className="px-4 ">
        <img
          src="https://res.cloudinary.com/dtcaf7prf/image/upload/v1717837155/PetCare/unique_id_1717837153371.png"
          alt="logo"
          className="h-20"
        />
      </div>
      <div className="flex gap-2 *:cursor-pointer *:flex *:items-center *:justify-center">
        <div>
          {navBars.map(({ _id, title, link }) => (
            <Link
              key={_id}
              className={`link ${
                pathName === _id ? "active text-blue-600 fond-medium" : "text-black"
              } flex font-normal w-20 h-6 hover:font-bold justify-center items-center px-12 text-base  underline-offset-[4px] decoration-[1px] md:border-r-[2px] border-r-gray-300 hoverEffect last:border-r-0`}
              href={link}
            >
              {title}
            </Link>
          ))}
        </div>

        <div className="p-2 cursor-pointer hover:font-bold ">Sign out</div>
      </div>
    </div>
  );
};

export default Header;
