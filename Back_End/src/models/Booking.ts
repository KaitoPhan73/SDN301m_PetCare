import mongoose, { Schema, Document, ObjectId } from "mongoose";
import { IBooking, BookingStatus } from "../types/booking";

const BookingSchema: Schema = new Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    status: { type: String, default: BookingStatus.Pending },
  },
  { versionKey: false, timestamps: true }
);

export default BookingSchema;
