import { httpPetCare } from "@/lib/http";
import { TRoomResponse } from "@/schemaValidations/room.schema";
import { TTableResponse } from "@/types/Table";

const RoomApi = {
  getRooms: (params?: any) => {
    return httpPetCare.get<TTableResponse<TRoomResponse>>("/room", {
      params,
    });
  },
  getRoomById: (id: string) => {
    return httpPetCare.get<TRoomResponse>(`/room/${id}`);
  },
};

export default RoomApi;
