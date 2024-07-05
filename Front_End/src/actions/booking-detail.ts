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
};

export default BookingDetailApi;
