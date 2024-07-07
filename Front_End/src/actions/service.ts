import { httpPetCare } from "@/lib/http";
import { TService } from "@/schemaValidations/service.schema";
import { TTableResponse } from "@/types/Table";

const ServiceApi = {
  getServices: (params?: any) => {
    return httpPetCare.get<TTableResponse<TService>>("/service", { params });
  },
  getService: (id: string) => {
    return httpPetCare.get<TService>(`/service/${id}`);
  },
  createService: (data: TService) => {
    return httpPetCare.post<TService>("/service", data);
  },
};

export default ServiceApi;
