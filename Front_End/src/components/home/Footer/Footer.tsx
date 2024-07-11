"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaFacebook, FaYoutube, FaLinkedin, FaGithub } from "react-icons/fa";
import FooterListTitle from "./FooterListTitle";
import Image from "@/components/designLayouts/Image";
import Link from "next/link";

const Footer = () => {
  const [emailInfo, setEmailInfo] = useState("");
  const [subscription, setSubscription] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const emailValidation = () => {
    return String(emailInfo)
      .toLocaleLowerCase()
      .match(/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/);
  };

  return (
    <div className="w-full bg-[#F5F5F3] py-20">
      <div className="max-w-container mx-auto grid grid-cols-1 md:grid-cols-2  xl:grid-cols-6 px-4 gap-10">
        <div className="col-span-2">
          <FooterListTitle title=" PetCare Center" />
          <div className="flex flex-col gap-6">
            <p className="text-base w-full xl:w-[80%]">
              PetCare Center offers top-notch care for your pets, including
              health check-ups, vaccinations, grooming, and daily care. Our
              experienced team ensures your pets are loved and well-cared for.
            </p>
          </div>
        </div>
        <div>
          <FooterListTitle title="Shop" />
          <ul className="flex flex-col gap-2">
            <Link
              href="/product"
              className="font-titleFont text-base text-lightText hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300"
            >
              Combo
            </Link>
          </ul>
        </div>
        <div>
          <FooterListTitle title="More" />
          <ul className="flex flex-col gap-2">
            <Link
              href="/booking"
              className="font-titleFont text-base text-lightText hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300"
            >
              Booking
            </Link>
            <Link
              href="/login"
              className="font-titleFont text-base text-lightText hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300"
            >
              Sign in
            </Link>
            <Link
              href="/register"
              className="font-titleFont text-base text-lightText hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300"
            >
              Sign up
            </Link>
          </ul>
        </div>
        <div className="col-span-2 flex flex-col items-center w-full px-4">
          <FooterListTitle title="Following our website" />
          <div className="w-full">
            <p className="text-center mb-4">
              A pet is the only thing on earth that loves you more than you
              love.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
