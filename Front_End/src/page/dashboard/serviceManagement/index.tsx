"use client";
import React, { useState } from "react";
import { Modal, Button, Descriptions } from "antd";
import TableRender from "@/components/FeTable/TableRender";
import { CustomColumnType } from "@/types/TablePropsCustom";
import { TServiceResponse } from "@/schemaValidations/service.schema";
import { format } from "date-fns"; // Import format function from date-fns

interface Props {
    props: any;
    data: any;
}

export default function ServiceManagementPage({ props, data }: Props) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedService, setSelectedService] = useState<TServiceResponse | null>(null);

    const showModal = (record: TServiceResponse) => {
        setSelectedService(record);
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
        setSelectedService(null);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setSelectedService(null);
    };

    const formatDate = (date: string) => {
        return format(new Date(date), "dd/MM/yyyy - HH:mm:ss");
    };

    const columns: CustomColumnType<TServiceResponse>[] = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Image",
            dataIndex: "image",
            key: "image",
            render: (text: string) => <img src={text} alt="service" style={{ width: '50px' }} />,
        },
        {
            title: "Price",
            dataIndex: "price",
            key: "price",
        },
        {
            title: "Time",
            dataIndex: "time",
            key: "time",
        },
        {
            title: "Detail",
            dataIndex: "name",
            key: "detail",
            render: (_text: any, record: TServiceResponse) => (
                <Button onClick={() => showModal(record)}>Detail</Button>
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
            {selectedService && (
                <Modal
                    title="Service Details"
                    visible={isModalVisible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                >
                    <Descriptions bordered column={1}>
                        <Descriptions.Item label="Name">{selectedService.name}</Descriptions.Item>
                        <Descriptions.Item label="Description">{selectedService.description}</Descriptions.Item>
                        <Descriptions.Item label="Price">{selectedService.price}</Descriptions.Item>
                        <Descriptions.Item label="Time">{selectedService.time}</Descriptions.Item>
                        <Descriptions.Item label="Created At">{formatDate(selectedService.createdAt)}</Descriptions.Item>
                        <Descriptions.Item label="Updated At">{formatDate(selectedService.updatedAt)}</Descriptions.Item>
                    </Descriptions>
                </Modal>
            )}
        </>
    );
}
