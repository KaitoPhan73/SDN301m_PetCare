"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaUser, FaCaretDown } from "react-icons/fa";
import { useSelector } from "react-redux";
import Link from "next/link";
import { Flex } from "antd";
import { RootState } from "@/redux/store";

const HeaderBottom = () => {
  const [showUser, setShowUser] = useState(false);
  const user = useSelector((state: RootState) => state.user.user);

  return (
    <div className="w-full bg-[#F5F5F3] relative">
      <div className="max-w-container mx-auto">
        <Flex className="flex flex-col lg:flex-row items-end lg:items-center justify-between w-full px-4 pb-4 lg:pb-0 h-full lg:h-12">
          {/* Button to toggle user dropdown */}
          <div
            onClick={() => setShowUser(!showUser)}
            className="flex h-14 cursor-pointer items-center gap-2 text-primeColor ml-auto"
          >
            <FaUser />
            <FaCaretDown />
          </div>

          {/* User dropdown menu */}
          {showUser && (
            <motion.ul
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="absolute top-10 right-0 z-50 bg-black w-44 text-[#767676] h-auto p-4 pb-6"
            >
              {user ? (
                <>
                  {/* Profile link */}
                  <Link onClick={() => setShowUser(false)} href="/profile">
                    <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                      Profile
                    </li>
                  </Link>
                  {/* {user.role === "Customer" && (
                    <Link onClick={() => setShowUser(false)} href="/booking">
                      <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                        Booking
                      </li>
                    </Link>
                  )} */}

                  {/* Dashboard link (only visible to admins) */}
                  {user.role === "Admin" && (
                    <Link
                      onClick={() => setShowUser(false)}
                      href="/admin/users"
                    >
                      <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                        Dashboard
                      </li>
                    </Link>
                  )}

                  {/* Logout link */}
                  <Link onClick={() => setShowUser(false)} href="/logout">
                    <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                      Logout
                    </li>
                  </Link>
                </>
              ) : (
                <>
                  {/* Login link */}
                  <Link href="/login">
                    <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                      Login
                    </li>
                  </Link>

                  {/* Register link */}
                  <Link onClick={() => setShowUser(false)} href="/register">
                    <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                      Sign Up
                    </li>
                  </Link>
                </>
              )}
            </motion.ul>
          )}
        </Flex>
      </div>
    </div>
  );
};

export default HeaderBottom;
