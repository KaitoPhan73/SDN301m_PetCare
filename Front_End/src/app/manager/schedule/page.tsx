import {Calendar} from "@/components/Calendar/Calendar";
import RoomApi from "@/actions/room";
import {useState} from "react";
import {TRoomResponse} from "@/schemaValidations/room.schema";

 const Schedule = () => {
    
    return <Calendar role={"manager"}/>
}
export default Schedule