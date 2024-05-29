import mongoose, { Schema, Document, ObjectId } from "mongoose";
import { IBooking, BookingStatus } from "../types/booking";

const BookingSchema: Schema = new Schema(
  {
    createDate: { type: Date, required: true, default: Date.now },
    modifiedDate: { type: Date, required: true, default: Date.now },
    userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    status: { type: String, default: BookingStatus.Pending },
    // bookingStatus: { type: String, enum: Object.values(BookingStatus) },
  },
  { versionKey: false }
);

export default BookingSchema;
