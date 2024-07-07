"use client"
import TableRender from "@/components/FeTable/TableRender";
import React from "react";
import { TableColumnsType } from "antd";
import { TUserBase } from "@/types/User";

interface Props {
    props: any;
    data: any;
}

export default function UserManagementPage({ props, data }: Props) {
    console.log("log::", data);
    const columns: TableColumnsType<TUserBase> = [
        {
            title: "Username",
            dataIndex: "username",
        },
        {
            title: "Email",
            dataIndex: "email",
        },
        {
            title: "Status",
            dataIndex: "status",
        },
        {
            title: "Role",
            dataIndex: "role",
        },
    ];

    return <TableRender columns={columns} data={data} propsUrl={props} onDelete onEdit onCreate />;
}
