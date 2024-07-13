import { httpPetCare } from "@/lib/http";
import {
  TBookingResponse,
  TBookingRequest, TBookingByStaffResponse,
} from "@/schemaValidations/booking.schema";
import { TTableResponse } from "@/types/Table";

const BookingApi = {
  getBookings: (params?: any, accessToken?: string) => {
    return httpPetCare.get<TTableResponse<TBookingResponse>>("/booking", {
      params,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },
  getBooking: (id: string) => {
    return httpPetCare.get<TBookingResponse>(`/booking/${id}`);
  },
  createBooking: (data: any) => {
    return httpPetCare.post<TBookingResponse>("/booking", data);
  },
  getBookingByRoom: (roomId: string) => {
    return httpPetCare.post<TBookingResponse[]>("booking/getByRoom", {roomId});
  },
  getBookingByStaffId: (staffId: string) => {
    return httpPetCare.get<TBookingByStaffResponse[]>(`booking/getBooking/${staffId}`);
  },
  
};

export default BookingApi;
