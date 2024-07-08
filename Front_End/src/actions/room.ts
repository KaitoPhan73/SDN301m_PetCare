import { httpPetCare } from "@/lib/http";
import { TRoomBase } from "@/types/Room";
import { TTableResponse } from "@/types/Table";

const RoomApi = {
  getRooms: (params?: any) => {
    return httpPetCare.get<TTableResponse<TRoomBase>>("/room", {
      params,
    });
  },
  getRoomById: (id: string) => {
    return httpPetCare.get<TRoomBase>(`/room/${id}`);
  },
};

export default RoomApi;
