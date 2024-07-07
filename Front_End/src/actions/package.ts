import { httpPetCare } from "@/lib/http";
import {
  TPackageResponse,
  TPackageRequest,
} from "@/schemaValidations/package.schema";
import { TTableResponse } from "@/types/Table";

const PackageApi = {
  getPackages: (params?: any) => {
    return httpPetCare.get<TTableResponse<TPackageResponse>>("/package", {
      params,
    });
  },
  getPackage: (id: string) => {
    return httpPetCare.get<TPackageResponse>(`/package/${id}`);
  },
  createPackage: (data: TPackageRequest) => {
    return httpPetCare.post<TPackageResponse>("/package", data);
  },
};

export default PackageApi;
