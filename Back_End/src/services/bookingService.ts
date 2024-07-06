import { Booking, BookingDetail } from "../models";
import { BookingStatus, IBooking } from "../types/booking";
import moment from "moment-timezone";
import { TPagination } from "../types/pagination";
import { paginate } from "../utils/paginationExtension";
import { BookingDetailStatus, IBookingDetail } from "../types/bookingDetail";

export const getBookings = async (
  options: any
): Promise<TPagination<IBooking>> => {
  try {
    const result = await paginate(Booking, options);

    // Iterate through each booking to calculate totalPrice
    for (const booking of result.items) {
      let totalPrice = 0;

      // Populate all booking details
      await BookingDetail.populate(booking, {
        path: "bookingDetails",
      });

      // Sum up totalPrice based on non-cancelled booking details
      booking.bookingDetails.forEach((detail: IBookingDetail) => {
        if (detail.status !== BookingDetailStatus.Cancelled) {
          totalPrice += detail.price as number;
        }
      });

      // Update totalPrice in the result
      booking.totalPrice = totalPrice;
    }

    return result;
  } catch (error) {
    throw new Error("Error fetching bookings");
  }
};

export const getBookingById = async (
  bookingId: string
): Promise<IBooking | null> => {
  try {
    const booking = await Booking.findById(bookingId)
      .populate("bookingDetails")
      .exec();

    if (booking) {
      let totalPrice = 0;

      // Tính lại totalPrice dựa trên bookingDetails
      booking.bookingDetails.forEach((detail: IBookingDetail) => {
        if (detail.status !== BookingDetailStatus.Cancelled) {
          totalPrice += detail.price as number;
        }
      });

      // Cập nhật totalPrice của booking
      booking.totalPrice = totalPrice;
    }

    return booking;
  } catch (error) {
    console.error("Error fetching booking:", error);
    return null;
  }
};

export const createBooking = async (
  bookingData: IBooking
): Promise<IBooking> => {
  try {
    // Tính totalPrice từ các bookingDetails
    let totalPrice: number = 0;
    const bookingDetailsIds: string[] = [];

    // Lấy _id của các bookingDetails và tính totalPrice
    if (bookingData.bookingDetails && bookingData.bookingDetails.length > 0) {
      for (const detail of bookingData.bookingDetails) {
        bookingDetailsIds.push(detail._id); // Lấy _id của bookingDetail và thêm vào mảng bookingDetailsIds
        totalPrice += detail.price as number;
      }
    }

    // Tạo đối tượng Booking mới
    const newBooking: IBooking = new Booking({
      ...bookingData,
      status: BookingStatus.Pending,
      bookingDetails: bookingDetailsIds, // Gán mảng bookingDetailsIds vào bookingDetails của newBooking
      totalPrice: totalPrice,
    });

    // Lưu đối tượng mới tạo vào cơ sở dữ liệu
    await newBooking.save();

    return newBooking;
  } catch (error) {
    throw new Error(`Error creating Booking: ${error}`);
  }
};

export const deleteBookingById = async (bookingId: string): Promise<void> => {
  try {
    await Booking.findByIdAndDelete(bookingId);
  } catch (error) {
    throw new Error("Error deleting booking");
  }
};

export const updateBookingById = async (
  bookingId: string,
  updateData: Partial<IBooking>
): Promise<IBooking | null> => {
  try {
    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      updateData,
      { new: true }
    );
    return updatedBooking;
  } catch (error) {
    throw new Error("Error updating booking");
  }
};
