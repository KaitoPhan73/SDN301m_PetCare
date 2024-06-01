"use client";
import React, { useEffect, useState } from "react";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import Link from "next/link";

const About = () => {
  // const location = useLocation();
  // const [prevLocation, setPrevLocation] = useState("");
  // useEffect(() => {
  //   setPrevLocation(location.state.data);
  // }, [location]);
  return (
    <div className="max-w-container mx-auto px-4">
      <div className="pb-10">
        <h1 className="max-w-[600px] text-base text-lightText mb-2">
          <span className="text-primeColor font-semibold text-lg">
            Our mission
          </span>{" "}
          is to minimize our environmental footprint while providing
          high-quality products and services to our customers. We strive to
          incorporate sustainability principles into every aspect of our
          operations, from sourcing and manufacturing to packaging and
          distribution.
        </h1>
        <Link href="/shop">
          <button className="w-52 h-10 bg-black text-white hover:bg-black duration-300">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
};

export default About;
