"use client";

import { resetCart } from "@/redux/Cart/cartSlice";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BookingApi from "@/actions/booking"; // Import BookingApi
import BookingDetailApi from "@/actions/booking-detail"; // Import BookingDetailApi
import { TBookingDetailRequest } from "@/schemaValidations/booking-detail.schema";

interface Props {
  data?: any;
}

export default function PaymentCompletePage({ data }: Props) {
  const router = useRouter();
  const products = useSelector((state: RootState) => state.cart.products);
  const user = useSelector((state: RootState) => state.user.user);
  const [message, setMessage] = useState("Processing payment...");
  const [countdown, setCountdown] = useState(5);
  const dispatch = useDispatch();

  const handlePayment = async () => {
    if (data.status === "1") {
      setMessage("Payment successful! Redirecting to homepage...");
      try {
        // Mảng để lưu trữ các bookingDetails đã được tạo
        const createdBookingDetails = await Promise.all(
          products.map(async (product: any) => {
            const bookingDetail: TBookingDetailRequest = {
              packageId: product.packageId,
              roomId: product.roomId,
              checkInDate: product.checkInDate,
              price: product.price,
            };

            // Tạo từng bookingDetail và lưu trữ kết quả trả về
            const createdDetail = await BookingDetailApi.createBookingDetail(
              bookingDetail
            );
            return createdDetail.payload;
          })
        );

        // Lấy các _id của các bookingDetails đã tạo
        const bookingDetailsIds = createdBookingDetails.map((detail) => ({
          _id: detail._id,
          packageId: detail.packageId,
          roomId: detail.roomId,
          checkInDate: detail.checkInDate,
          price: detail.price,
        }));

        // Tạo booking với các bookingDetails đã tạo
        const bookingResponse = await BookingApi.createBooking({
          userId: "6688eca1e04b57a20ec4266f",
          bookingDetails: bookingDetailsIds,
        });

        console.log("Booking response", bookingResponse);

        // Xóa cart trong localStorage và reset cart trong Redux store
        localStorage.removeItem("cart");
        dispatch(resetCart());
      } catch (error) {
        console.error("Error creating booking or booking details", error);
        setMessage("Error during booking process! Redirecting to homepage...");
      }
    } else {
      setMessage("Payment failed! Redirecting to homepage...");
    }

    // Bộ đếm thời gian để chuyển hướng sau khi xử lý thanh toán
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown <= 1) {
          clearInterval(timer);
          router.push("/");
          router.refresh();
          return 0;
        }
        return prevCountdown - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  };

  useEffect(() => {
    handlePayment();
  }, []);

  return (
    <div className="px-5 h-screen flex flex-col items-center justify-center">
      <h1>Payment Complete</h1>
      <p>{message}</p>
      <p>Redirecting in {countdown} seconds...</p>
    </div>
  );
}
