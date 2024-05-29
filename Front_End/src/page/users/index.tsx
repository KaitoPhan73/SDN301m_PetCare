import { getUsers } from "@/app/actions/users";
import CustomTable from "@/components/FeTable/CustomTable";
import TableRender from "@/components/FeTable/TableRender";
import { TUserBase } from "@/types/User";
import { TableColumnsType } from "antd";
import React from "react";
interface Props {
  props: any;
  data: any;
}
export default function UserPage({ props, data }: Props) {
  const columns: TableColumnsType<TUserBase> = [
    {
      title: "id",
      dataIndex: "id",
    },
    {
      title: "username",
      dataIndex: "username",
    },
    {
      title: "name",
      dataIndex: "name",
    },
    {
      title: "role",
      dataIndex: "role",
    },
    {
      title: "status",
      dataIndex: "status",
    },
  ];

  return (
    <CustomTable
      onDelete
      onEdit
      columns={columns}
      props={props}
      rowKey="id"
      // dataSource={arr}
      getData={getUsers}
    />
  );
}
