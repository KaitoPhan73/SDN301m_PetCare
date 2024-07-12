import React from "react";
import PackageApi from "@/actions/package";
import RoomApi from "@/actions/room";
import { TRoomResponse } from "@/schemaValidations/room.schema";
import dynamic from "next/dynamic";
const BookingPage = dynamic(() => import("@/page/booking"), { ssr: false });
export default async function page() {
  const params = {
    page: 1,
    limit: 100,
  };
  const dataPakage = await PackageApi.getPackages(params);
  const dataRoom = await RoomApi.getRooms(params);

  const dataRooms: TRoomResponse[] = dataRoom.payload.items;

  const data = {
    dataPakages: dataPakage.payload.items,
    dataRooms,
  };

  return <BookingPage data={data} />;
}
