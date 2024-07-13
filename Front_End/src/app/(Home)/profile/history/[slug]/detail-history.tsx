"use client";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { formatDate, formatPriceVND, formatTime } from "@/lib/utils";
import { TBookingDetailResponse } from "@/schemaValidations/booking-detail.schema";
import { DialogBookingDetailCancel } from "@/components/dialog-cancel-booking-detail";
import { DialogFeedBack } from "@/components/dialog-feedback";
import { DialogShowFeedBack } from "@/components/dialog-show-feedback";

type Props = {
  dataSource: TBookingDetailResponse[];
};

const HistoryDetail = ({ dataSource }: Props) => {
  // State quản lý toggle hiển thị chi tiết
  const [expandedItems, setExpandedItems] = useState<{
    [key: string]: boolean;
  }>({});

  // Hàm toggle chi tiết
  const toggleDetail = (itemId: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  return (
    <div>
      {dataSource.length > 0 ? (
        <>
          {/* Header */}
          <div className="hidden lg:grid grid-cols-5 py-3 gap-4">
            <div className="font-normal text-xl leading-8 text-gray-500">
              Package Name
            </div>
            <div className="font-normal text-xl leading-8 text-gray-500">
              Room Name
            </div>
            <div className="font-normal text-xl leading-8 text-gray-500 text-center">
              Total Time
            </div>
            <div className="font-normal text-xl leading-8 text-gray-500 text-center">
              Price (VND)
            </div>
            <div className="font-normal text-xl leading-8 text-gray-500 text-center">
              Action
            </div>
          </div>

          {/* Items */}
          {dataSource.map((item, index) => (
            <section
              key={index}
              className="w-full mx-auto mt-5 mb-5"
              onClick={() => toggleDetail(item._id)}
            >
              <div className="grid grid-cols-5 gap-4 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
                {/* Package Name */}
                <div className="px-4 py-6 flex items-center justify-start">
                  <span className="text-lg font-bold text-black truncate capitalize">
                    {item.packageId.name}
                  </span>
                </div>

                {/* Room Name */}
                <div className="px-4 py-6 flex items-center justify-start">
                  <p className="text-lg font-semibold text-black">
                    {item.roomId.name}
                  </p>
                </div>

                {/* Total Time */}
                <div className="px-4 py-6 flex items-center justify-center">
                  <p className="text-lg font-semibold text-black">
                    {formatTime(item.packageId.totalTime)}
                  </p>
                </div>

                {/* Price */}
                <div className="px-4 py-6 flex items-center justify-end">
                  <p className="text-lg font-semibold text-black">
                    {formatPriceVND(item.price)}
                  </p>
                </div>

                <div
                  className={`px-4 py-6 flex items-center justify-center ${
                    item.status !== "Pending"
                      ? "cursor-not-allowed opacity-50"
                      : ""
                  }`}
                  onClick={
                    item.status === "Pending" || item.status === "Completed"
                      ? (e) => e.stopPropagation()
                      : undefined
                  }
                >
                  {item.status === "Pending" && (
                    <DialogBookingDetailCancel _id={item._id} />
                  )}

                  {item.status === "Completed" &&
                    (!item.feedbackId ? (
                      <DialogFeedBack _id={item._id} />
                    ) : (
                      <DialogShowFeedBack feedback={item.feedbackId} />
                    ))}

                  {item.status !== "Pending" && item.status !== "Completed" && (
                    <button
                      className="rounded-full w-full max-w-[280px] py-4 text-center justify-center items-center bg-green-300 font-semibold text-lg text-white flex "
                      disabled
                    >
                      <span className="px-2">{item.status}</span>
                    </button>
                  )}
                </div>
              </div>
              {/* Toggle Details Content */}
              {expandedItems[item._id] && (
                <div className="bg-gray-50 p-4 mt-2 rounded-lg shadow-inner">
                  {/* Thêm nội dung chi tiết mà bạn muốn hiển thị khi mở */}
                  <p className="text-sm text-gray-700">
                    About this booking detail
                  </p>
                  <p className="text-sm text-gray-700">
                    check-in: {formatDate(item.checkInDate)}
                  </p>

                  <p className="text-sm text-gray-700">
                    check-out : {formatDate(item.checkOutDate)}
                  </p>
                  {/* Bạn có thể thêm nhiều chi tiết hơn tùy ý */}
                </div>
              )}
            </section>
          ))}
        </>
      ) : (
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col md:flex-col justify-center items-center gap-4 pb-20 pt-20"
        >
          <Image
            src="https://cdni.iconscout.com/illustration/premium/thumb/sorry-item-not-found-3328225-2809510.png?f=webp"
            alt="not found"
            width={320}
            height={240}
          />

          <h1 className="font-titleFont text-xl font-bold uppercase">
            History is empty!
          </h1>
        </motion.div>
      )}
    </div>
  );
};

export default HistoryDetail;
