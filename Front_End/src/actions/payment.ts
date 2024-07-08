import { httpPetCare } from "@/lib/http";

const paymentApi = {
  useZalo: (body: any) => {
    return httpPetCare.post<any>("/payment/zalopay", body);
  },
};

export default paymentApi;
