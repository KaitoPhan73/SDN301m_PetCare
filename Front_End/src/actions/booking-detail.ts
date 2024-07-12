import { httpPetCare } from "@/lib/http";
import {
  TBookingDetailResponse,
  TBookingDetailRequest,
} from "@/schemaValidations/booking-detail.schema";

import { TTableResponse } from "@/types/Table";

const BookingDetailApi = {
  createBookingDetail: (data: TBookingDetailRequest) => {
    return httpPetCare.post<TBookingDetailResponse>("/booking-detail", data);
  },
  updateBookingDetail: (id: string, data: any) => {
    return httpPetCare.patch<TBookingDetailResponse>(
      `/booking-detail/${id}`,
      data
    );
  },
  updateStaff: (id: string, staffId: string) => {
    return httpPetCare.put<TBookingDetailResponse>(
        `/booking-detail/${id}`,
        {staffId}
    );
  }
};

export default BookingDetailApi;
