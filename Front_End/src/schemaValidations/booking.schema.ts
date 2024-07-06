import { z } from "zod";
import BookingDetailForBookingSchema from "./booking-detail.schema";

const BookingSchema = z.object({
  userId: z.string(),
  bookingDetails: z.array(BookingDetailForBookingSchema),
});

export type TBookingRequest = z.TypeOf<typeof BookingSchema>;

export type TBookingResponse = TBookingRequest & {
  _id: string;
  createdAt: string;
  updatedAt: string;
};

export default BookingSchema;
