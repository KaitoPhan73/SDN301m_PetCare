<<<<<<< HEAD
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
=======
import { httpInvoice, httpMock } from "@/lib/http";
import { TTableResponse } from "@/types/Table";
import { TUserBase } from "@/types/User";

const getUsers = async (sessionToken: string, params?: any) => {
  "use server";
  return httpInvoice.get<TTableResponse<TUserBase>>("brands", {
    params,
    headers: { Authorization: `Bearer ${sessionToken}` },
  });
};

const userApi = {
  getUsers,
>>>>>>> 50d63dc22eb4b76d916a4aa5d919802afbfe16df
};

export default userApi;
