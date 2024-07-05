import { z } from "zod";

export const BookingDetailSchema = z.object({
  checkInDate: z.date() || z.string(),
  price: z.number(),
  packageId: z.string(),
  bookingId: z.string(),
  roomId: z.string(),
});

export type TBookingDetailRequest = z.TypeOf<typeof BookingDetailSchema>;

export type TBookingDetailResponse = TBookingDetailRequest & {
  _id: string;
  createdAt: string;
  updatedAt: string;
  checkOutDate: string;
};

export default BookingDetailSchema;
