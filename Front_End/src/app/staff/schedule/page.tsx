"use client"
import CalendarStaff from "@/components/Calendar/CalendarStaff";
import {useSelector} from "react-redux";
import {RootState} from "@/redux/store";


const Schedule = () => {
    const user = useSelector((state: RootState) => state.user.user);
    return <CalendarStaff staffId={user?._id ?? ""}/>
}
export default Schedule