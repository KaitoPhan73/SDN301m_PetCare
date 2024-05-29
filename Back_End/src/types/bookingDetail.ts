import { Document, ObjectId } from "mongoose";

export enum BookingDetailStatus {
  Pending = "pending",
  Confirmed = "confirmed",
  Cancelled = "cancelled",
}

export interface IBookingDetail extends Document {
  checkInData: Date;
  checkOutData: Date;
  price: Number;
  serviceId: ObjectId;
  bookingId: ObjectId;
  RoomId: ObjectId;
  isCompleted: BookingDetailStatus;
  bookingDetailStatus: String;
}
