import { z } from "zod";
import BookingDetailForBookingSchema, {
  TBookingDetailResponse,
} from "./booking-detail.schema";
import { TUser } from "./user.schema";

export const BookingSchema = z.object({
  detail: z.string(),
  userId: z.string(),
  userName: z.string(),
  status: z.boolean({required_error: "Status is required"}),
  totalPrice: z.number(),
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
