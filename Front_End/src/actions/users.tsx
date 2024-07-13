import { httpPetCare } from "@/lib/http";
import { TRegisterRequest } from "@/schemaValidations/auth.schema";
import { TUserResponse } from "@/schemaValidations/user.schema";
import { TTableResponse } from "@/types/Table";

const userApi = {
  getUsers: (accessToken: string, params?: any) => {
    return httpPetCare.get<TTableResponse<TUserResponse>>("/user", {
      params,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },
  getUser: (userId: string, accessToken: string) => {
    return httpPetCare.get<TUserResponse>(`/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },
  getEmployees: (params?: any) => {
    return httpPetCare.get<TTableResponse<TUserResponse>>("user/employees", {
      params,
    });
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
    return httpPetCare.put<TUserResponse>(`/auth/updatePassword`, data);
  },
  getCustomer: (params?: any) => {
    return httpPetCare.get<TTableResponse<TUserResponse>>("user/customers", {
      params,
    });
  },
  getStaff: (params?: any) => {
    return httpPetCare.get<TUserResponse[]>("user/staffs", {
      params,
    });
  },
};

export default userApi;
