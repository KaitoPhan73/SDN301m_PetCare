import { BookingDetail } from "../models";
import { BookingDetailStatus, IBookingDetail } from "../types/bookingDetail";
import moment from "moment-timezone";

export const createBookingDetail = async (
  bookingData: IBookingDetail
): Promise<IBookingDetail> => {
  try {
    const newBookingDetail: IBookingDetail = new BookingDetail({
      ...bookingData,
      status: BookingDetailStatus.Pending,
    });
    console.log("newBookingDetail", newBookingDetail);
    await newBookingDetail.save();
    return newBookingDetail;
  } catch (error) {
    throw new Error(`Error creating Booking Detail: ${error}`);
  }
};
