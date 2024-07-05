import BookingPage from "@/page/booking";
import React from "react";
import PackageApi from "@/actions/package";
import RoomApi from "@/actions/room";
export default async function page() {
  const params = {
    page: 1,
    limit: 100,
  };
  const dataPakage = await PackageApi.getPackages(params);
  const dataRoom = await RoomApi.getRooms(params);
  const data = {
    dataPakages: dataPakage.payload.items,
    dataRooms: dataRoom.payload.items,
  };
  return <BookingPage data={data} />;
}
