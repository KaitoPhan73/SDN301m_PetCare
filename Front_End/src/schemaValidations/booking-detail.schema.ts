import _ from "lodash";
import { z } from "zod";
import { TPackageResponse } from "./package.schema";
import { TRoomResponse } from "./room.schema";

export const BookingDetailSchema = z.object({
  checkInDate: z.date() || z.string(),
  checkOutDate: z.date() || z.string(),
  price: z.number(),
  status: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  packageId: z.string(),
  roomId: z.string(),
});

export const BookingDetailForBookingSchema = z.object({
  _id: z.string(),
  checkInDate: z.date() || z.string(),
  price: z.number(),
  packageId: z.string(),
  roomId: z.string(),
  status: z.string().optional(),
});

export type TBookingDetailRequest = z.TypeOf<typeof BookingDetailSchema>;

export type TBookingDetailForBookingRequest = z.TypeOf<
  typeof BookingDetailForBookingSchema
>;

export type TBookingDetailResponse = TBookingDetailRequest & {
  _id: string;
  detail: string;
  status: string;
  packageId: TPackageResponse;
  roomId: TRoomResponse;
  createdAt: string;
  updatedAt: string;
  checkInDate: string;
  checkOutDate: string;
};

export default BookingDetailSchema;
