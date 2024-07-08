import { z } from "zod";
import BookingDetailForBookingSchema from "./booking-detail.schema";

export const BookingSchema = z.object({
  detail: z.string(),
  userId: z.string(),
  status: z.boolean({required_error: "Status is required"}),
  totalPrice: z.number(),
  bookingDetails: z.array(BookingDetailForBookingSchema),
});

export type TBookingRequest = z.TypeOf<typeof BookingSchema>;

export type TBookingResponse = TBookingRequest & {
  _id: string;
  createdAt: string;
  updatedAt: string;
};
