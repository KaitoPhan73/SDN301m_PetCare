import { httpPetCare } from "@/lib/http";
import { TServiceResponse } from "@/schemaValidations/service.schema";
import { TTableResponse } from "@/types/Table";

const ServiceApi = {
  getServices: (accessToken: string, params?: any) => {
    return httpPetCare.get<TTableResponse<TServiceResponse>>("/service", {
      params,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },
  getService: (id: string, params?: any) => {
    return httpPetCare.get<TServiceResponse>(`/service/${id}`, { params });
  },
  createService: (data: TServiceResponse) => {
    return httpPetCare.post<TServiceResponse>("/service", data);
  },
  updateService: (data: TServiceResponse, id: string) => {
    return httpPetCare.put<TServiceResponse>(`/service/${id}`, data);
  },
};

export default ServiceApi;
