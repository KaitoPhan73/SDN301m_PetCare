"use client"
import {Event} from "./Calendar";
import {CircleX} from "lucide-react";
import {formatCustomDate} from "@/lib/formatDate";
import React, {useEffect, useState} from "react";
import {TUserResponse} from "@/schemaValidations/user.schema";
import Link from "next/link";
// import {MenuItem, Select} from '@mui/material';
import BookingDetailApi from "@/actions/booking-detail";
import {Select, Tag} from "antd";

interface ModalProps {
    event: Event | null;
    isOpen: boolean;
    onClose: () => void;
    staff: TUserResponse[];
    change: () => void,
    role: string
}

const ModalEvent = ({event, isOpen, onClose, staff, change, role}: ModalProps) => {
    const [staffOfPackage, setStaffOfPackage] = useState<string>("")
    useEffect(() => {

        if (event?.staffId) {
            setStaffOfPackage(event.staffId);
        }
    }, [event]);
    if (!isOpen || !event) {
        return null;
    }


    const updateStaff = async () => {
        await BookingDetailApi.updateStaff(event.bookingDetailId, staffOfPackage)
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
                    <div><strong>Status:</strong> <Tag>{event.status}</Tag></div>
                    <div>
                        <strong>Staff: </strong>
                        <Select className=" rounded   w-1/2" value={staffOfPackage} disabled={role !== "admin"}
                                onChange={(e) => setStaffOfPackage(e)}
                                options={staff?.map((staffMember) => (
                                    {label: staffMember.username, value: staffMember._id}
                                ))}
                        >

                        </Select>
                    </div>
                </div>
                <div className="flex gap-4 text-sm justify-end mt-4">
                    <button
                        className="bg-white border text-black py-2 px-5 rounded hover:bg-gray-50"
                        onClick={() => {
                            setStaffOfPackage("");
                            onClose()
                        }}
                    >
                        Close
                    </button>
                    <button className="bg-black text-white py-2 px-5 rounded hover:bg-gray-800" onClick={() => {
                        updateStaff();
                        onClose();
                        setStaffOfPackage("")
                    }}>
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalEvent;
