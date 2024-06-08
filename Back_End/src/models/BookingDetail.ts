import { BookingDetailStatus, IBookingDetail } from "./../types/bookingDetail";
import mongoose, { Schema, Document, ObjectId } from "mongoose";

const BookingSchema: Schema = new Schema(
  {
    checkInData: { type: Date, required: true, default: Date.now },
    checkOutData: { type: Date, required: true, default: Date.now },
    price: { type: Number, required: true },
    packageId: { type: mongoose.Types.ObjectId, ref: "Package", require: true },
    bookingId: {
      type: mongoose.Types.ObjectId,
      ref: "Booking",
      required: true,
    },
    roomId: {
      type: mongoose.Types.ObjectId,
      ref: "Room",
      required: true,
    },
    isCompleted: { type: String, default: BookingDetailStatus.Pending },
  },
  { versionKey: false }
);

export default BookingSchema;
