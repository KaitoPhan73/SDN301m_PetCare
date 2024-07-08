import { httpPetCare } from "@/lib/http";
import { TRegisterRequest } from "@/schemaValidations/auth.schema";
import { TUserResponse } from "@/schemaValidations/user.schema";
import { TTableResponse } from "@/types/Table";

const userApi = {
  getUsers: (params?: any) => {
    return httpPetCare.get<TTableResponse<TUserResponse>>("/user", {
      params,
    });
  },
  getUser: (userId: string) => {
    return httpPetCare.get<TUserResponse>(`/user/${userId}`);
  },
  getEmployees: () => {
    return httpPetCare.get<TUserResponse[]>("/employees", {});
  },
  disableUser: (userId: string) => {
    return httpPetCare.get<TUserResponse>(`/user/disable/${userId}`);
  },
  enableUser: (userId: string) => {
    return httpPetCare.get<TUserResponse>(`/user/enable/${userId}`);
  },
  updateUser: (userId: string, data: any) => {
    //tamj thoi de any
    return httpPetCare.put<TUserResponse>(`/user/${userId}`, {
      data,
    });
  },
  updatePassword: (data: any) => {
    return httpPetCare.put<TUserResponse>(`/auth/updatePassword`, {
      data,
    });
  },
};

export default userApi;
