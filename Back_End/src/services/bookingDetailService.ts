import { BookingDetail, Package } from "../models";
import { BookingDetailStatus, IBookingDetail } from "../types/bookingDetail";

import moment from "moment";
import { IPackage } from "../types/package";

export const createBookingDetail = async (
  bookingData: IBookingDetail
): Promise<IBookingDetail> => {
  try {
    const packageData: IPackage | null = await Package.findById(
      bookingData.packageId
    );
    if (!packageData) {
      throw new Error(`Package with id ${bookingData.packageId} not found.`);
    }

    // Calculate checkOutDate from checkInData and totalTime
    const checkInDate = moment(bookingData.checkInData);
    const checkOutDate = checkInDate
      .add(packageData.totalTime, "days")
      .toDate();

    // Create new BookingDetail object
    const newBookingDetail: IBookingDetail = new BookingDetail({
      ...bookingData,
      checkOutData: checkOutDate,
      status: BookingDetailStatus.Pending,
    });

    console.log("newBookingDetail", newBookingDetail);

    // Save newBookingDetail to the database
    await newBookingDetail.save();

    return newBookingDetail;
  } catch (error) {
    throw new Error(`Error creating Booking Detail: ${error}`);
  }
};
export const updateOne = async function (
  bookingDetailId: string,
  updateData: Partial<IBookingDetail>
): Promise<IBookingDetail | null> {
  try {
    const updatedBookingDetail = await BookingDetail.findByIdAndUpdate(
      bookingDetailId,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedBookingDetail) {
      throw new Error(`Booking Detail with id ${bookingDetailId} not found.`);
    }

    return updatedBookingDetail;
  } catch (error) {
    throw new Error(`Error updating Booking Detail: ${error}`);
  }
};

export const checkExisting = async (
  packageId: string,
  checkInDate: Date,
  roomId: string
): Promise<boolean> => {
  try {
    const packageData = await Package.findById(packageId);
    if (!packageData) {
      throw new Error(`Package with id ${packageId} not found.`);
    }

    const checkInTime = moment(checkInDate).utc(); // convert to UTC for consistency
    const checkOutTime = checkInTime
      .clone()
      .add(packageData.totalTime, "minutes")
      .utc()
      .toDate(); // Ensure time is added correctly

    console.log("checkInTime:", checkInTime.format());
    console.log("checkOutTime:", checkOutTime);

    // Find existing bookings that overlap with the new booking time
    const existingBooking = await BookingDetail.findOne({
      roomId: roomId,
      $or: [
        {
          checkInDate: { $lt: checkOutTime },
          checkOutDate: { $gt: checkInTime.toDate() },
        },
        {
          checkInDate: { $lt: checkOutTime },
          checkOutDate: { $gt: checkInTime.toDate() },
        },
      ],
    });

    return !!existingBooking;
  } catch (error) {
    throw new Error(`Error checking existing Booking Detail: ${error}`);
  }
};
export const getBookingDetail = async (
  bookingId: string
): Promise<IBookingDetail | null> => {
  try {
    return await BookingDetail.findById(bookingId);
  } catch (error) {
    throw new Error(`Error fetching Booking Detail: ${error}`);
  }
};
