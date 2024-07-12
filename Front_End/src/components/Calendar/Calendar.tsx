"use client"
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid"
import listPlugin from "@fullcalendar/list";
import {useEffect, useState} from "react";
import userApi from "@/actions/users";
import {TUserResponse} from "@/schemaValidations/user.schema";
import {MenuItem, Select} from '@mui/material';
import BookingApi from "@/actions/booking";
import {TRoomResponse} from "@/schemaValidations/room.schema";
import RoomApi from "@/actions/room";
import {TBookingDetailResponse} from "@/schemaValidations/booking-detail.schema";
import ModalEvent from "@/components/Calendar/ModalEvent";
import {Inter} from 'next/font/google';
import {TBookingResponse} from "@/schemaValidations/booking.schema";

const inter = Inter({subsets: ['latin']});


export type Event = {
    id: string,
    bookingDetailId: string,
    price: number,
    userId: string,
    userName: string,
    start: string,
    end: string,
    roomName: string,
    roomCode: string,
    status: string,
    checkInDate: string,
    checkOutDate: string,
    packageCode: string,
    title: string,
    packagePrice: number,
    description: string,
    packageName: string,
    staffId: string,
    staffName: string
}
export const Calendar = ({role}:{role:string}) => {
    const [roomList, setRoomList] = useState<TRoomResponse[]>([]);
    const [room, setRoom] = useState<string>("");
    const [events, setEvents] = useState<Event[]>([]);
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [staff, setStaff] = useState<TUserResponse[]>([]);

    const getRooms = async () => {
        const rooms = await RoomApi.getRoomList();
        setRoomList(rooms.payload);
        setRoom(rooms.payload[0]?._id || "");
    }

    const getBookingByRoom = async (roomId: string) => {
        if (roomId) {
            const rs = await BookingApi.getBookingByRoom(roomId);
            const formatBooking: Event[] = []
            if (rs.payload) {
                console.log(rs.payload)
                rs.payload.forEach((booking: TBookingResponse) => {
                    booking?.bookingDetails.forEach((bookingDetail: TBookingDetailResponse) => {
                        if (booking?.bookingDetails) {
                            formatBooking.push({
                                id: bookingDetail._id,
                                bookingDetailId: bookingDetail._id,
                                price: bookingDetail.price,
                                userId: booking.userId._id,
                                userName: booking.userId.username,
                                start: bookingDetail.checkInDate,
                                end: bookingDetail.checkOutDate,
                                checkInDate: bookingDetail.checkInDate,
                                checkOutDate: bookingDetail.checkOutDate,
                                roomName: bookingDetail.roomId.name,
                                roomCode: bookingDetail.roomId._id,
                                status: bookingDetail.status,
                                packageCode: bookingDetail.packageId?._id,
                                title: bookingDetail.packageId?.name,
                                packageName: bookingDetail.packageId?.name,
                                packagePrice: bookingDetail.packageId?.price,
                                description: bookingDetail.packageId?.description,
                                staffId: bookingDetail?.staffId?._id ?? "",
                                staffName: bookingDetail?.staffId?.username ?? ""

                            })
                        }

                    })
                })
            }
            setEvents(formatBooking);
        }
    }


    const handleEventClick = (clickInfo: any) => {
        const event = clickInfo.event;
        setSelectedEvent(event.extendedProps);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedEvent(null);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed':
                return 'bg-green-500';
            case 'process':
                return 'bg-blue-500';
            case 'Pending':
                return 'bg-yellow-500';
            case 'cancel':
                return 'bg-red-500';
            default:
                return 'bg-gray-500';
        }
    };
    const getColorBg = (staff: string) => {
        if (staff !== "") {
            return 'bg-green-500';
        } else {
            return 'bg-yellow-500';
        }
    }
    // Custom render function for events
    const renderEventContent = (eventInfo: any) => {
        const event = eventInfo.event;
        const statusColor = getStatusColor(event.extendedProps.status);
        const bgColor = getColorBg(event.extendedProps.staffId);
        console.log(event.status)

        return (
            <div className={`flex gap-2 text-left items-center w-full h-full ${bgColor} border-none text-white` }>
                <div className={`h-2 w-2 ${statusColor} rounded-full`}></div>
                <div className={"w-full overflow-x-hidden truncate"}>
                    <b className={"truncate"}>{event.title}</b>
                    <br/>
                    <i className={"truncate"}>{event.extendedProps.description ?? "None"}</i>
                </div>
            </div>
        );
    };

    const getEmployee = async () => {
        const data = await userApi.getEmployees();
        setStaff(data?.payload.items);
    }
const [isChange, setIsChange]=useState(false);
    const change = ()=>{
        setIsChange(!isChange);
    }
    useEffect(() => {
        getRooms();
        getEmployee();
    }, []);

    useEffect(() => {
        if (room) {
            getBookingByRoom(room);
        }
    }, [room,isChange]);
    console.log(events)
    return (
        <div className={inter.className}>
            <div className={"w-full flex-4 py-4 font-sans font-lg"}>
                <span className={"text-lg pr-6"}>Filter Room</span>
                <Select className={""} value={room} onChange={(e) => {
                    setRoom(e.target.value as string);
                    getBookingByRoom(e.target.value as string);
                }}>
                    {roomList.map((room) => (
                        <MenuItem key={room._id} value={room._id}>{room.name}</MenuItem>
                    ))}
                </Select>
            </div>
            <div>
                <FullCalendar
                    plugins={[
                        dayGridPlugin,
                        interactionPlugin,
                        timeGridPlugin,
                        listPlugin
                    ]}
                    headerToolbar={{
                        left: 'prev next',
                        center: 'title',
                        right: 'timeGridWeek dayGridMonth dayGridYear'
                    }}
                    businessHours={{
                        daysOfWeek: [0, 1, 2, 3, 4, 5, 6],
                        startTime: '08:00',
                        endTime: '22:00',
                    }}
                    slotMinTime="08:00:00"
                    slotMaxTime="22:00:00"
                    events={events}
                    eventTextColor={"#fff"}
                    eventContent={renderEventContent}
                    eventColor={"#fff"}
                    initialView={"timeGridWeek"}
                    nowIndicator={true}
                    selectable={true}
                    selectMirror={true}
                    displayEventTime={true}
                    eventClick={handleEventClick}
                />
            </div>
            <ModalEvent event={selectedEvent} isOpen={isModalOpen} onClose={closeModal} staff={staff} change={change} role={role}/>
        </div>
    );
}
