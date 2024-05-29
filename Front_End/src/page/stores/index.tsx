import TableRender from "@/components/FeTable/TableRender";
import { TStoresBase } from "@/types/Strore";
import { TableColumnsType } from "antd";
import React from "react";
interface Props {
  props: any;
  data: any;
}
export default function StoresPage({ props, data }: Props) {
  const columns: TableColumnsType<TStoresBase> = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Short Name",
      dataIndex: "shortName",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Code",
      dataIndex: "code",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
  ];

  return <TableRender columns={columns} data={data} onDelete onEdit onCreate />;
}
