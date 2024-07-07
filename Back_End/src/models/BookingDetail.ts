import { BookingDetailStatus, IBookingDetail } from "./../types/bookingDetail";
import mongoose, { Schema, Document, ObjectId } from "mongoose";

const BookingDetailSchema = new Schema(
  {
    checkInDate: { type: Date, required: true, default: Date.now },
    checkOutDate: { type: Date, required: true, default: Date.now },
    staffId: { type: mongoose.Types.ObjectId, ref: "User", required: false },
    price: { type: Number, required: true },
    packageId: {
      type: mongoose.Types.ObjectId,
      ref: "Package",
      required: true,
    },
    roomId: { type: mongoose.Types.ObjectId, ref: "Room", required: true },
    status: { type: String, default: "Pending" },
    // booking: { type: mongoose.Types.ObjectId, ref: "Booking", required: true },
  },
  { versionKey: false, timestamps: true }
);

export default BookingDetailSchema;
