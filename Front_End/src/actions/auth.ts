import { httpPetCare, httpServer } from "@/lib/http";
import {
  TLoginBody,
  TLoginResponse,
  TRegisterRequest,
} from "@/schemaValidations/auth.schema";
import { TUserResponse } from "@/schemaValidations/user.schema";
const authApi = {
  checkLogin: (body: TLoginBody) =>
    httpPetCare.post<TLoginResponse>("auth/login", body),
  auth: (body: { accessToken: any; user: any }) =>
    httpServer.post("/api/auth", body),
  logoutFromNextServerToServer: (accessToken: string) =>
    httpServer.post<any>(
      "/auth/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    ),
  createUser: (data: TRegisterRequest) => {
    return httpPetCare.post<TUserResponse>("/auth/signup", data);
  },
  logoutFromNextClientToNextServer: (
    force?: boolean | undefined,
    signal?: AbortSignal | undefined
  ) =>
    httpServer.post<any>(
      "/api/auth/logout",
      {
        force,
      },
      {
        baseUrl: "",
        signal,
      }
    ),
};

export default authApi;
