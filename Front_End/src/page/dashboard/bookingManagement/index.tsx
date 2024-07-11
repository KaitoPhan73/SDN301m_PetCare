"use client"

import React, { useState } from "react";
import { Modal, Descriptions, Button } from "antd";
import TableRender from "@/components/FeTable/TableRender";
import { format } from "date-fns"; // Import format function from date-fns
import { CustomColumnType } from "@/types/TablePropsCustom";
import { TBookingResponse } from "@/schemaValidations/booking.schema";
import { TBookingDetailResponse } from "@/schemaValidations/booking-detail.schema";

interface Props {
    props: any;
    data: any;
}

export default function BookingManagementPage({ props, data }: Props) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState<TBookingResponse | null>(null);

    const showModal = (record: TBookingResponse) => {
        setSelectedBooking(record);
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
        setSelectedBooking(null);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setSelectedBooking(null);
    };

    const formatDate = (date: string) => {
        return format(new Date(date), "dd/MM/yyyy - HH:mm:ss");
    };

    const columns: CustomColumnType<TBookingResponse>[] = [
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
            key: "detail",
            dataIndex: "detail",
            render: (_text: any, record: TBookingResponse) => (
                <Button onClick={() => showModal(record)}>Detail</Button>
            ),
        },
        {
            title: "Created At",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (createdAt: string) => formatDate(createdAt), // Format createdAt column
        },
        {
            title: "Updated At",
            dataIndex: "updatedAt",
            key: "updatedAt",
            render: (updatedAt: string) => formatDate(updatedAt), // Format updatedAt column
        },
    ];

    return (
        <>
            <TableRender
                columns={columns}
                data={data}
                propsUrl={props}
                onDelete={() => { }}
                onEdit={() => { }}
                onCreate={() => { }}
            />
            {selectedBooking && (
                <Modal
                    title="Booking Details"
                    visible={isModalVisible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    style={{ maxHeight: "80vh" }}
                    className="custom-modal"
                    bodyStyle={{ maxHeight: "60vh", overflowY: "auto" }}
                >
                    {selectedBooking.bookingDetails.map((detail, index: number) => (
                        <div key={index} style={{ marginBottom: '20px' }}>
                            <h2 style={{ fontWeight: 'bold' }}>Booking Detail {index + 1}</h2><br/>
                            <Descriptions bordered column={1}>
                                <Descriptions.Item label="Check In Date">{formatDate(detail.checkInDate.toString())}</Descriptions.Item>
                                <Descriptions.Item label="Check Out Date">{formatDate(detail.checkOutDate.toString())}</Descriptions.Item>
                                <Descriptions.Item label="Price">{detail.price}</Descriptions.Item>
                                <Descriptions.Item label="Status">{detail.status}</Descriptions.Item>
                                <Descriptions.Item label="Created At">{formatDate(detail.createdAt)}</Descriptions.Item>
                                <Descriptions.Item label="Updated At">{formatDate(detail.updatedAt)}</Descriptions.Item>
                            </Descriptions>
                        </div>
                    ))}
                </Modal>
            )}
        </>
    );
}
