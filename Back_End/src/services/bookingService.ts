import { Booking } from "../models";
import { BookingStatus, IBooking } from "../types/booking";
import moment from "moment-timezone";
import { TPagination } from "../types/pagination";
import { paginate } from "../utils/paginationExtension";

export const getBookings = async (
  options: any
): Promise<TPagination<IBooking>> => {
  try {
    return paginate(Booking, options);
  } catch (error) {
    throw new Error("Error fetching bookings");
  }
};

export const createBooking = async (
  bookingData: IBooking
): Promise<IBooking> => {
  try {
    const nowInVietnam = moment.tz("Asia/Ho_Chi_Minh");
    const newBooking: IBooking = new Booking({
      ...bookingData,
      createDate: nowInVietnam.toDate(),
      modifiedDate: nowInVietnam.toDate(),
      status: BookingStatus.Pending,
    });
    console.log("newBooking", newBooking);
    await newBooking.save();
    return newBooking;
  } catch (error) {
    throw new Error(`Error creating Booking: ${error}`);
  }
};

// export const createBooking = async (bookingData: IBooking): Promise<IBooking> => {
//     try {
//         const newBooking: IBooking = new Booking(bookingData);
//         await newBooking.save();
//         return newBooking;
//     } catch (error) {
//         throw new Error(`Error creating Booking: `);
//     }
// };

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
    const nowInVietnam = moment.tz(Date(), "Asia/Ho_Chi_Minh");
    updateData.modifiedDate = nowInVietnam.toDate();
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
