"use client"
import React, { useEffect, useState } from 'react';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid"
import listPlugin from "@fullcalendar/list";

 
import BookingApi from "@/actions/booking";
 
import {TBookingDetailByStaffResponse} from "@/schemaValidations/booking-detail.schema";
import ModalEvent from "@/components/Calendar/ModalEvent";
import {Inter} from 'next/font/google';
import {TBookingByStaffResponse,} from "@/schemaValidations/booking.schema";
import ModalUpdate from "@/components/Calendar/ModalUpdateStatus";

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
    description: string,
    packageName: string,
    
}
  const CalendarStaff = ({staffId}:{staffId:string}) => {
  
    const [room, setRoom] = useState<string>("");
    const [events, setEvents] = useState<Event[]>([]);
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);



    const getBookingByRoom = async (staffId:string) => {
        if (staffId) {
            const rs = await BookingApi.getBookingByStaffId(staffId);
            const formatBooking: Event[] = []
            if (rs.payload) {
                console.log(rs.payload)
                rs.payload.forEach((booking: TBookingByStaffResponse) => {
                    // @ts-ignore
                    booking?.bookingDetails.forEach((bookingDetail: TBookingDetailByStaffResponse) => {
                        // @ts-ignore
                        if (booking?.bookingDetails) {
                            formatBooking.push({
                                id: bookingDetail._id,
                                bookingDetailId: bookingDetail._id,
                                price: bookingDetail.price,
                                userId: booking?.userId?._id,
                                userName: booking?.userId?.username,
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
                                description: bookingDetail.packageId?.description,
                               

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
            case 'Completed':
                return 'bg-green-500';
            case 'Process':
                return 'bg-blue-500';
            case 'Pending':
                return 'bg-yellow-500';
            case 'Cancel':
                return 'bg-red-500';
            default:
                return 'bg-gray-500';
        }
    };
    const getColorBg = (staff: string) => {
        if (staff !== "") {
            return 'bg-green-700';
        } else {
            return 'bg-red-800';
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
                <div className={`h-3 w-3 ${statusColor} rounded-full m-1`}></div>
                <div className={"w-full overflow-x-hidden truncate"}>
                    <b className={"truncate"}>{event.title}</b>
                    <br/>
                    <i className={"truncate"}>{event.extendedProps.description ?? "None"}</i>
                </div>
            </div>
        );
    };

   
    const [isChange, setIsChange]=useState(false);
    const change = ()=>{
        setIsChange(!isChange);
    }
    useEffect(() => {
        getBookingByRoom(staffId)
    }, [staffId, isChange]);

   
    console.log(events)
    return (
        <div className={inter.className}>
           
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
                    // selectable={true}
                    selectMirror={true}
                    displayEventTime={true}
                    eventClick={handleEventClick}
                />
            </div>
            <ModalUpdate event={selectedEvent} isOpen={isModalOpen} onClose={closeModal}  change={change} />
        </div>
    );
}
export default CalendarStaff