import {Booking, BookingDetail, User} from "../models";
import {BookingStatus, IBooking} from "../types/booking";
import {TPagination} from "../types/pagination";
import {paginate} from "../utils/paginationExtension";
import {BookingDetailStatus, IBookingDetail} from "../types/bookingDetail";
import mongoose from "mongoose";

export const getBookings = async (
    options: any
): Promise<TPagination<IBooking>> => {
    try {
        let updatedOptions = {
            ...options,
            populate: {
                path: "userId",
                select: "_id username",
            },
        };
        if (options.userId) {
            const userObj = await User.findById(options.userId).select("_id").exec();
            updatedOptions = {
                ...updatedOptions,
                userId: userObj?._id,
            };
        }

        const result = await paginate(Booking, updatedOptions);

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
        console.error("Error fetching bookings:", error);
        throw new Error("Error fetching bookings");
    }
};

export const getBookingById = async (
    bookingId: string
): Promise<IBooking | null> => {
    try {
        const booking = await Booking.findById(bookingId)
            .populate({
                path: "bookingDetails",
                populate: [
                    {path: "packageId", model: "Package"},
                    {path: "roomId", model: "Room"},
                ],
            })
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
            {new: true}
        );
        return updatedBooking;
    } catch (error) {
        throw new Error("Error updating booking");
    }
};
export const getByTime = async (roomId: string): Promise<IBooking[] | null> => {
    console.log(roomId)
    // const roomIdToFind = new mongoose.Types.ObjectId(roomId);
    const bookings = await Booking.find()
        .populate([
            {
                path: 'bookingDetails',
                match: {roomId: new mongoose.Types.ObjectId(roomId)},
                populate: [
                    {path: 'packageId', model: 'Package'},
                    {path: 'staffId', model: 'User'},

                ]
            },
            {path: "userId", model: "User"}
        ]);
    console.log(bookings)
    const filteredBookings = bookings.filter(booking =>
        booking.bookingDetails.some(detail => detail.roomId.toString() === roomId)
    );

    return filteredBookings;
}