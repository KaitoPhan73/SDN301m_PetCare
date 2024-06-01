import { httpMock } from "@/lib/http";
import { TTableResponse } from "@/types/Table";
import { TUserBase } from "@/types/User";
import { get } from "lodash";

const userApi = {
  getUsers: (params?: any) => {
    return httpMock.get<TTableResponse<TUserBase>>("/student/users", {
      params,
    });
  },
  getUser: (id: string) => {
    return httpMock.get<TUserBase>(`/student/users/${id}`);
  },
};

export default userApi;
