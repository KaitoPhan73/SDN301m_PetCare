import RoomApi from "@/actions/room";
import ItemArrow from "@/components/home/BothArrowItem/ItemArrow";
import HomePage from "@/page/home";
import React from "react";

const Rooms = async (props: any) => {
  const params = {
    page: props.searchParams.page ? props.searchParams.page : 1,
    limit: props.searchParams.limit ? props.searchParams.limit : 10,
  };

  const data = await RoomApi.getRooms(params);
  return <ItemArrow dataSource={data.payload.items} />;
};
export default Rooms;
