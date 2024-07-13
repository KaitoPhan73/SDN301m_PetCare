"use client";

import { Table, TableColumnsType, Tag } from "antd";
import React, { useEffect, useState } from "react";
import RoleTag from "@/components/manager/RoleTag";
import Operation from "@/components/manager/Operation";
import userApi from "@/actions/users";
import { TUser } from "@/types/User";

interface IUserWithKey extends TUser {
    key: number;
}

const TablePermission = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const [totalPage, setTotalPage] = useState<number>(1);
    const [dataSource, setDataSource] = useState<IUserWithKey[]>([]);
    const [isChange, setIsChange] = useState<boolean>(true);
    const handleChange = () => {
        setIsChange(!isChange)
    }

    useEffect(() => {
        const fetchUsers = async (page: number, limit: number) => {


            const response = await userApi.getEmployees({page, limit});

            const usersWithKey = response.payload?.items?.map((user, index) => ({
                ...user,
                key: index + (page - 1) * limit,
            }));
            setDataSource(usersWithKey);
            setTotalPage(response.payload.total);

        };

        fetchUsers(currentPage, pageSize);
    }, [currentPage, isChange]);

    const columns: TableColumnsType<TUser> = [
        {
            title: "User Name",
            dataIndex: "username",
        },
        {
            title: "Email",
            dataIndex: "email",
        },
        {
            title: "Role",
            dataIndex: "role",
            render: (_value: string) => {
                return <RoleTag content={_value} />;
            },
        },
        {
            title: "Status",
            dataIndex: "status",
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
            title: "",
            key: "operation",
            render: (record: TUser, _, index) => (
                <div className="flex justify-center items-center cursor-pointer">
                    <Operation record={record} handleChange={handleChange} />
                </div>
            ),
        },
    ];

    const handleTableChange = (pagination: any) => {
        setCurrentPage(pagination);
    };

    return (
        <div className="flex flex-col gap-4 justify-center items-center p-10">
            <div className="font-medium text-4xl tracking-wide">
                Employee table
            </div>
            <div className="w-full">
                <Table
                    columns={columns}
                    bordered
                    dataSource={dataSource}
                    pagination={{
                        current: currentPage,
                        pageSize: pageSize,
                        total: totalPage,
                        onChange: handleTableChange,
                    }}
                />
            </div>
        </div>
    );
};

export default TablePermission;
