import mongoose, { Schema, Document, ObjectId } from "mongoose";
import { IBooking, BookingStatus } from "../types/booking";

const BookingSchema = new Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    status: { type: String, default: "Pending" },
    totalPrice: { type: Number, required: true },
    bookingDetails: [{ type: mongoose.Types.ObjectId, ref: "BookingDetail" }],
  },
  { versionKey: false, timestamps: true }
);

export default BookingSchema;
