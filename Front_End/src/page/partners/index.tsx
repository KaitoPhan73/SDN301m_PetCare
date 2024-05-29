import TableRender from "@/components/FeTable/TableRender";
import { TPartnersBase } from "@/types/Partner";
import { TableColumnsType } from "antd";
import React from "react";
interface Props {
  props: any;
  data: any;
}
export default function PartnersPage({ props, data }: Props) {
  const columns: TableColumnsType<TPartnersBase> = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "API URL",
      dataIndex: "apiUrl",
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Environment",
      dataIndex: "environment",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Schema Config",
      dataIndex: "schemaConfig",
    },
  ];

  return <TableRender columns={columns} data={data} onDelete onEdit onCreate />;
}
