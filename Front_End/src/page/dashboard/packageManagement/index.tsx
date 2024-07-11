"use client";
import React, { useState } from "react";
import { Modal, Button, Descriptions } from "antd";
import TableRender from "@/components/FeTable/TableRender";
import { CustomColumnType } from "@/types/TablePropsCustom";
import { TPackageResponse } from "@/schemaValidations/package.schema";
import { format } from "date-fns"; // Import format function from date-fns

interface Props {
    props: any;
    data: any;
}

export default function PackageManagementPage({ props, data }: Props) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedPackage, setSelectedPackage] = useState<TPackageResponse | null>(null);

    const showModal = (record: TPackageResponse) => {
        setSelectedPackage(record);
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
        setSelectedPackage(null);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setSelectedPackage(null);
    };

    const formatDate = (date: string) => {
        return format(new Date(date), "dd/MM/yyyy - HH:mm:ss");
    };

    const columns: CustomColumnType<TPackageResponse>[] = [
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
            title: "Discount",
            dataIndex: "discount",
            key: "discount",
        },
        {
            title: "Total Time",
            dataIndex: "totalTime",
            key: "totalTime",
        },
        // {
        //     title: "Detail",
        //     dataIndex: "detail",
        //     key: "detail",
        //     render: (_text: any, record: TPackageResponse) => (
        //         <Button onClick={() => showModal(record)}>Detail</Button>
        //     ),
        // },
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
            {selectedPackage && (
                <Modal
                    title="Package Details"
                    visible={isModalVisible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                >
                    <Descriptions bordered column={1}>
                        <Descriptions.Item label="Name">{selectedPackage.name}</Descriptions.Item>
                        <Descriptions.Item label="Description">{selectedPackage.description}</Descriptions.Item>
                        <Descriptions.Item label="Price">{selectedPackage.price}</Descriptions.Item>
                        <Descriptions.Item label="Discount">{selectedPackage.discount}</Descriptions.Item>
                        <Descriptions.Item label="Total Time">{selectedPackage.totalTime}</Descriptions.Item>
                        <Descriptions.Item label="Created At">{formatDate(selectedPackage.createdAt)}</Descriptions.Item>
                        <Descriptions.Item label="Updated At">{formatDate(selectedPackage.updatedAt)}</Descriptions.Item>
                    </Descriptions>
                </Modal>
            )}
        </>
    );
}
