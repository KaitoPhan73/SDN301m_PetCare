import { httpServer } from "@/lib/http";
import { IUser } from "@/schemaValidations/user.schema";
import { TTableResponse } from "@/types/Table";

const userApi = {
  getUsers: (params?: any) => {
    return httpServer.get<TTableResponse<IUser>>("user", {
      params,
    });
  },
  getUser: (userId: string) => {
    
    return httpServer.get<IUser>(`user/${userId}`);
  },
};

export default userApi;
