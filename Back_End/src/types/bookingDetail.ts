import { Document, ObjectId } from "mongoose";

export enum BookingDetailStatus {
  Pending = "Pending",
  Confirmed = "Confirmed",
  Cancelled = "Cancelled",
  Completed = "Completed",
}

export interface IBookingDetail extends Document {
  checkInData: Date;
  checkOutData: Date;
  price: Number;
  packageId: ObjectId;
  // bookingId: ObjectId;
  staffId?: ObjectId;
  roomId: ObjectId;
  status: BookingDetailStatus;
  bookingDetailStatus: String;
  createdAt: Date;
  updatedAt: Date;
}
