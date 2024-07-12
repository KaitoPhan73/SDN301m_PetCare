"use client"
import {Event} from "./CalendarStaff";
import {CircleX} from "lucide-react";
import {formatCustomDate} from "@/lib/formatDate";
import React, {useEffect, useState} from "react";
import Link from "next/link";
// import {MenuItem, Select} from '@mui/material';
import BookingDetailApi from "@/actions/booking-detail";
import {Select} from "antd";
import {useSnackbar} from "notistack";

interface ModalProps {
    event: Event | null;
    isOpen: boolean;
    onClose: () => void;
    change: () => void,
}

const ModalUpdate = ({event, isOpen, onClose, change}: ModalProps) => {
        const [status, setStatus] = useState<string>("");
        useEffect(() => {

            if (event?.status) {
                setStatus(event.status);
            }
        }, [event]);

        if (!isOpen || !event) {
            return null;
        }
        const {enqueueSnackbar} = useSnackbar();

        const updateStatus = async () => {
            const response = await BookingDetailApi.updateStatus(event.bookingDetailId, status)
            try {
                if (response.status === 200) {
                    enqueueSnackbar("Update status success", {
                        variant: "success",
                    });

                }
            } catch
                (error) {
                enqueueSnackbar("Update status failed", {
                    variant: "error",
                });
                console.log("Error:", error);
            }
            change()
        }

        console.log(event)
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold uppercase">{event.packageName}</h2>
                        <span className="cursor-pointer" onClick={onClose}>
                        <CircleX className="text-gray-500 hover:text-gray-700"/>
                    </span>
                    </div>
                    <div className="flex flex-col gap-2">
                        <p><strong>Package Name:</strong> <Link
                            href={`/packages/${event.packageCode}`}>{event.packageName}</Link></p>
                        <p><strong>Description:</strong> {event.description}</p>
                        <div className={"flex gap-4 justify-between"}><p>
                            <strong>From:</strong> {formatCustomDate(event.checkInDate?.toString())}</p>
                            <p><strong>To:</strong> {formatCustomDate(event.checkOutDate?.toString())}</p></div>
                        <p><strong>Customer:</strong> {event.userName}</p>
                        <div><strong>Room:</strong>{event.roomName}</div>
                        <div>
                            <strong>Status: </strong>
                            <Select className=" rounded  w-1/2" value={status}
                                    onChange={(e) => setStatus(e)}
                                    options={["Pending", "Process", "Completed", "Cancel"].map((staffMember) => (
                                        {label: staffMember, value: staffMember}
                                    ))}
                            >

                            </Select>
                        </div>

                    </div>
                    <div className="flex gap-4 text-sm justify-end mt-4">
                        <button
                            className="bg-white border text-black py-2 px-5 rounded hover:bg-gray-50"
                            onClick={() => {
                                onClose()
                            }}
                        >
                            Close
                        </button>
                        <button className="bg-black text-white py-2 px-5 rounded hover:bg-gray-800" onClick={() => {
                            updateStatus();
                            onClose();
                        }}>
                            Save
                        </button>
                    </div>
                </div>
            </div>
        );
    }
;

export default ModalUpdate;
