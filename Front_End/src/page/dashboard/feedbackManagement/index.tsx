"use client"
import TableRender from "@/components/FeTable/TableRender";
import React, { useState, useEffect } from "react";
import { TableColumnsType } from "antd";
import { TFeedbackBase } from "@/types/Feedback";
import userApi from "@/actions/users";

interface Props {
    props: any;
    data: any;
}

export default function FeedBackManagementPage({ props, data }: Props) {
    const [userNames, setUserNames] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        const fetchUserNames = async () => {
            const userIds = data.map((item: TFeedbackBase) => item.userId);
            const users = await Promise.all(userIds.map((userId: string) => userApi.getUser(userId)));
            const newUserData = Object.fromEntries(users.map((user, index) => [userIds[index], user.payload.username]));
            setUserNames(newUserData);
        };

        if (data && data.length > 0) {
            fetchUserNames();
        }
    }, [data]);

    console.log("log::cc", data);

    const columns: TableColumnsType<TFeedbackBase> = [
        {
            title: "Content",
            dataIndex: "content",
        },
        {
            title: "Create Date",
            dataIndex: "createDate",
            render: (date: Date) => new Date(date).toLocaleString(), 
        },
        {
            title: "Modified Date",
            dataIndex: "modifiedDate",
            render: (date: Date) => new Date(date).toLocaleString(), 
        },
        {
            title: "Booking ID",
            dataIndex: "bookingId",
        },
        {
            title: "User Name",
            dataIndex: "userId",
            render: (userId: string) => userNames[userId.toString()] || userId.toString(),
        },
        {
            title: "Status",
            dataIndex: "status",
            render: (status: boolean) => (status ? "Active" : "Inactive"), 
        },
    ];

    return <TableRender columns={columns} data={data} propsUrl={props} onDelete onEdit onCreate />;
}
