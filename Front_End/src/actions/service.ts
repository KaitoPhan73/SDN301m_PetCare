import { httpPetCare } from "@/lib/http";
import { TServiceResponse } from "@/schemaValidations/service.schema";
import { TTableResponse } from "@/types/Table";

const ServiceApi = {
  getServices: (params?: any) => {
    return httpPetCare.get<TTableResponse<TServiceResponse>>("/service", { params });
  },
  getService: (id: string) => {
    return httpPetCare.get<TServiceResponse>(`/service/${id}`);
  },
  createService: (data: TServiceResponse) => {
    return httpPetCare.post<TServiceResponse>("/service", data);
  },
};

export default ServiceApi;
