import BookingPage from "@/page/booking";
import React from "react";
import PackageApi from "@/actions/package";
import RoomApi from "@/actions/room";
import { TRoomResponse } from "@/schemaValidations/room.schema";
import { TPackageResponse } from "@/schemaValidations/package.schema";
import { TRoomBase } from "@/types/Room";

export default async function page() {
  const params = {
    page: 1,
    limit: 100,
  };
  const dataPakage = await PackageApi.getPackages(params);
  const dataRoom = await RoomApi.getRooms(params);

  const dataRooms: TRoomResponse[] = dataRoom.payload.items.map((room: TRoomBase) => ({
    ...room,
    _id: room._id || generateId(),
  }));

  const data = {
    dataPakages: dataPakage.payload.items,
    dataRooms,
  };

  return <BookingPage data={data} />;
}

// Function to generate a unique ID if necessary
function generateId(): string {
  return `id_${Math.random().toString(36).substr(2, 9)}`;
}
