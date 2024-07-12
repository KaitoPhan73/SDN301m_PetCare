import {z} from "zod";
import {TPackageResponse} from "./package.schema";
import {TRoomResponse} from "./room.schema";
import {TUserResponse} from "@/schemaValidations/user.schema";

export const BookingDetailSchema = z.object({
    checkInDate: z.date() || z.string(),
    price: z.number(),
    packageId: z.string(),
    roomId: z.string(),
});

export const BookingDetailForBookingSchema = z.object({
    _id: z.string(),
    checkInDate: z.date() || z.string(),
    checkOutDate: z.date() || z.string(),
    price: z.number(),
    packageId: z.string(),
    roomId: z.string(),
    status: z.string().optional(),
});

export type TBookingDetailRequest = z.TypeOf<typeof BookingDetailSchema>;

export type TBookingDetailForBookingRequest = z.TypeOf<
    typeof BookingDetailForBookingSchema
>;

export type TBookingDetailResponse = {
    _id: string;
    status: string;
    staffId: TUserResponse;
    packageId: TPackageResponse;
    roomId: TRoomResponse;
    createdAt: string;
    updatedAt: string;
    checkOutDate: string;
    checkInDate: string,
    price: number,
};

export default BookingDetailSchema;