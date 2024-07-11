"use client";
import TableRender from "@/components/FeTable/TableRender";
import React from "react";
import { Tag } from "antd";
import { CustomColumnType } from "@/types/TablePropsCustom";
import { format } from "date-fns"; 
import { IUser } from "@/schemaValidations/user.schema";
import RoleTag from "@/components/manager/RoleTag";

interface Props {
    props: any;
    data: any; 
}

export default function UserManagementPage({ props, data }: Props) {
    const columns: CustomColumnType<IUser>[] = [
        {
            title: "Username",
            dataIndex: "username",
            key: "username",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (_value: boolean, record) => {
                return (
                    <Tag color={record.status ? "green" : "orange"}>
                        <span className="uppercase">
                            {record.status ? "Active" : "Inactive"}
                        </span>
                    </Tag>
                );
            },
        },
        {
            title: "Role",
            dataIndex: "role",
            key: "role",
            render: (_value: string) => {
                return <RoleTag content={_value} />;
            },
        },
    ];

    return (
        <TableRender
            columns={columns}
            data={data}
            propsUrl={props}
        />
    );
}
