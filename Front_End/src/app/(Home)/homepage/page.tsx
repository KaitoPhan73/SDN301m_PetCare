import roomApi from "@/actions/Room";
import userApi from "@/actions/users";
import HomePage from "@/page/home";
import React from "react";

const Rooms = async (props: any) => {
  const params = {
    page: props.searchParams.page ? props.searchParams.page : 1,
    limit: props.searchParams.limit ? props.searchParams.limit : 10,
  };
  const data = await roomApi.getRooms(params);
  return <HomePage data={data.payload} />;
};
export default Rooms;
