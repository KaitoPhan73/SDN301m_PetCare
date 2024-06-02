import { httpInvoice, httpMock } from "@/lib/http";
import { TRoomBase } from "@/types/Room";
import { TTableResponse } from "@/types/Table";
import { TUserBase } from "@/types/User";
import { get } from "lodash";

const RoomApi = {
  getRooms: (params?: any) => {
    return httpInvoice.get<TTableResponse<TRoomBase>>("/room", {
      params,
    });
  },
  getRoomById: (id: string) => {
    return httpInvoice.get<TRoomBase>(`/room`);
  },
};

export default RoomApi;
