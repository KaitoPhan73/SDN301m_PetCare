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
};

export default userApi;
