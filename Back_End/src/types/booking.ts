import { Document, ObjectId } from "mongoose";
import { IBookingDetail } from "./bookingDetail";

export enum BookingStatus {
  Pending = "Pending",
  Confirmed = "Confirmed",
  Cancelled = "Cancelled",
  Completed = "Completed",
}

export interface IBooking extends Document {
  createDate: Date;
  modifiedDate: Date;
  userId: ObjectId;
  userName:ObjectId;
  status: BookingStatus;
  bookingStatus: String;
  totalPrice: number;
  bookingDetails: IBookingDetail[];
  createdAt: Date;
  updatedAt: Date;
}
