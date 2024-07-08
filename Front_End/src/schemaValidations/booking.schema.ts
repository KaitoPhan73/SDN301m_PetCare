import { z } from "zod";
import BookingDetailForBookingSchema, {
  TBookingDetailResponse,
} from "./booking-detail.schema";
import { TUser } from "./user.schema";

const BookingSchema = z.object({
  userId: z.string(),
  bookingDetails: z.array(BookingDetailForBookingSchema),
});

export type TBookingRequest = z.TypeOf<typeof BookingSchema>;

export type TBookingResponse = TBookingRequest & {
  _id: string;
  bookingDetails: TBookingDetailResponse[];
  userId: TUser;
  status: string;
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
};

export default BookingSchema;
