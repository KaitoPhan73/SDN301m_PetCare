import { httpInvoice, httpServer } from "@/lib/http";
import { TLoginBody, TLoginResponse } from "@/schemaValidations/auth.schema";
const authApi = {
  checkLogin: (body: TLoginBody) =>
    httpInvoice.post<TLoginResponse>("auth/login", body),
  auth: (body: { accessToken: string }) => httpServer.post("/api/auth", body),
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
