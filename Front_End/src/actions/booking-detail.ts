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
  checkExistBookingDetailFromServer: (data: any) => {
    return httpPetCare.post<boolean>(`/booking-detail/check-existing`, data);
  },
  updateStaff: (id: string, staffId: string) => {
    return httpPetCare.put<TBookingDetailResponse>(`/booking-detail/${id}`, {
      staffId,
    });
  },
  updateStatus: (id: string, status: string) => {
    return httpPetCare.put<TBookingDetailResponse>(`/booking-detail/status/${id}`, {
      status,
    });
  }
};

export default BookingDetailApi;
