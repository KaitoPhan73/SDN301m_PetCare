"use client";
import React, { useState } from "react";
import { Modal, Button, Descriptions } from "antd";
import TableRender from "@/components/FeTable/TableRender";
import { CustomColumnType } from "@/types/TablePropsCustom";
import { TPackageResponse } from "@/schemaValidations/package.schema";
import { TServiceResponse } from "@/schemaValidations/service.schema";

interface Props {
    props: any;
    data: any;
}

export default function ServiceManagementPage({ props, data }: Props) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedPackage, setSelectedPackage] = useState<TServiceResponse | null>(null);

    const showModal = (record: TServiceResponse) => {
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
            dataIndex: "detail",
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
            {selectedPackage && (
                <Modal
                    title="Service Details"
                    visible={isModalVisible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                >
                    <Descriptions bordered column={1}>
                        <Descriptions.Item label="Name">{selectedPackage.name}</Descriptions.Item>
                        <Descriptions.Item label="Description">{selectedPackage.description}</Descriptions.Item>
                        <Descriptions.Item label="Price">{selectedPackage.price}</Descriptions.Item>
                        <Descriptions.Item label="Time">{selectedPackage.time}</Descriptions.Item>
                        <Descriptions.Item label="Created At">{selectedPackage.createdAt}</Descriptions.Item>
                        <Descriptions.Item label="Updated At">{selectedPackage.updatedAt}</Descriptions.Item>
                    </Descriptions>
                </Modal>
            )}
        </>
    );
}
