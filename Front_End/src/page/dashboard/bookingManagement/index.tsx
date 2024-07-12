"use client";
import React, { useState } from "react";
import { Modal, Descriptions, Button } from "antd";
import TableRender from "@/components/FeTable/TableRender";
import { CustomColumnType } from "@/types/TablePropsCustom";
import { TBookingResponse } from "@/schemaValidations/booking.schema";
import { IUser } from "@/schemaValidations/user.schema";
import {httpServer} from "@/lib/http";
import { TUser } from "@/types/User";


interface Props {
    props: any;
    data: any;
}

export default function BookingManagementPage({ props, data }: Props) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState<TBookingResponse | null>(null);
    const [selectedUser, setSelectedUser] = useState<IUser | null>(null);

    const showModal = (record: TBookingResponse, records: IUser) => {
        setSelectedBooking(record);
        setSelectedUser(fetchUserDetails(records));
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
        setSelectedBooking(null);
        setSelectedUser(null);

    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setSelectedBooking(null);
        setSelectedUser(null);

    };

    const columns: CustomColumnType<TBookingResponse>[] = [
        {
            title: "User ID",
            dataIndex: "userId",
            key: "userId",
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
        },
        {
            title: "Total Price",
            dataIndex: "totalPrice",
            key: "totalPrice",
        },
        {
            title: "Detail",
            dataIndex: "detail",
            key: "detail",
            render: (_text: any, record: TBookingResponse, records: TUser) => (
                <Button onClick={() => showModal(record, records)}>Detail</Button>
            ),
        },
    ];

    return (
        <>
            <TableRender
                columns={columns}
                data={data}
                propsUrl={props}
                onDelete={() => {}}
                onEdit={() => {}}
                onCreate={() => {}}
            />
            {selectedBooking && (
                <Modal
                    title="Booking Details"
                    visible={isModalVisible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                >
                    <Descriptions bordered column={1}>
                        <Descriptions.Item label="User Name">{selectedUser?.username}</Descriptions.Item>
                        <Descriptions.Item label="Status">{selectedBooking.status}</Descriptions.Item>
                        <Descriptions.Item label="Total Price">{selectedBooking.totalPrice}</Descriptions.Item>
                        <Descriptions.Item label="Create Date">{selectedBooking.createdAt}</Descriptions.Item>
                        <Descriptions.Item label="Modified Date">{selectedBooking.updatedAt}</Descriptions.Item>
                    </Descriptions>
                </Modal>
            )}
        </>
    );
}

async function fetchUserDetails(userId: string): Promise<IUser | undefined> {
    try {
        const response = await httpServer.get<IUser>(`user/${userId}`);
        return response.payload; 
    } catch (error) {
        console.error(`Error fetching user details for userId ${userId}:`, error);
        return undefined; 
    }
}
