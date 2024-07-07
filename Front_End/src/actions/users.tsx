import { httpPetCare } from "@/lib/http";
import { TUser } from "@/schemaValidations/user.schema";
import { TTableResponse } from "@/types/Table";

const userApi = {
  getUsers: (params?: any) => {
    return httpPetCare.get<TTableResponse<TUser>>("/user", {
      params,
    });
  },
  getUserById: (id: string) => {
    return httpPetCare.get<TUser>(`/user/${id}`);
  },
};

export default userApi;