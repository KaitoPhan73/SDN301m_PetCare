import { httpPetCare } from "@/lib/http";
import {
  TBookingResponse,
  TBookingRequest,
} from "@/schemaValidations/booking.schema";
import { TTableResponse } from "@/types/Table";

const BookingApi = {
  getBookings: (params?: any) => {
    return httpPetCare.get<TTableResponse<TBookingResponse>>("/booking", {
      params,
    });
  },
  getBooking: (id: string) => {
    return httpPetCare.get<TBookingResponse>(`/booking/${id}`);
  },
  createBooking: (data: any) => {
    return httpPetCare.post<TBookingResponse>("/booking", data);
  },
  getBookingByRoom: (roomId: string) => {
    return httpPetCare.post<TBookingResponse[]>("booking/getByRoom", {
      roomId,
    });
  },
};

export default BookingApi;
