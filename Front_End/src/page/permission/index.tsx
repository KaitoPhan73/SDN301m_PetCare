"use client";

import { IUser } from "@/schemaValidations/user.schema";
import { TTableResponse } from "@/types/Table";
import { Form, Table, TableColumnsType, Tag } from "antd";
import React, { useState } from "react";
import RoleTag from "./RoleTag";
import Operation from "./Operation";

interface IUserWithKey extends IUser {
  key: number;
}
const TablePermission = ({ response }: { response: TTableResponse<IUser> }) => {
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState<number>();
  const isEditing = (record: IUserWithKey): boolean => {
    return record.key === editingKey;
  };
  
  const columns: TableColumnsType<IUser> = [
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
              {" "}
              {record.status ? "Active" : "Inactive"}
            </span>
          </Tag>
        );
      },
    },
    {
      title: "",
      key: "operation",
      render: (record: IUser, _, index) => (
        <div className="flex justify-center items-center cursor-pointer">
          <Operation record={record}/>
        </div>
      ),
    },
  ];

  const usersWithKey = response.items.map((_user, index) => ({
    ..._user,
    key: index,
  }));

  const [dataSource, setDataSource] = useState<IUserWithKey[]>(usersWithKey);
  
  return (
    <div className="flex justify-center items-center p-10 ">
      <div className="w-2/3 ">
        <div className="font-medium text-4xl tracking-wide">
          Permission Table
        </div>
        <Table
          columns={columns}
          bordered
          dataSource={dataSource}
          components={{
            body: {
              // cell: EditableCell,
            },
          }}
        />
      </div>
    </div>
  );
};

export default TablePermission;
