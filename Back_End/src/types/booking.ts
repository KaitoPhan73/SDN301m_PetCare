import { Document, ObjectId } from "mongoose";

export enum BookingStatus {
  Pending = "pending",
  Confirmed = "confirmed",
  Cancelled = "cancelled",
}

export interface IBooking extends Document {
  createDate: Date;
  modifiedDate: Date;
  userId: ObjectId;
  status: BookingStatus;
  bookingStatus: String;
  createdAt: Date;
  updatedAt: Date;
}
