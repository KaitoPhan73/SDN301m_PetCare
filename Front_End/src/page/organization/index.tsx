import TableRender from "@/components/FeTable/TableRender";
import { TOrganizationsBase } from "@/types/Organization";
import { TableColumnsType } from "antd";
import React from "react";
interface Props {
  props: any;
  data: any;
}
export default function OrganizationsPage({ props, data }: Props) {
  const columns: TableColumnsType<TOrganizationsBase> = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
    {
      title: "Representative",
      dataIndex: "representative",
    },
    {
      title: "Tax Code",
      dataIndex: "taxCode",
    },
    {
      title: "Brand Name",
      dataIndex: "brandName",
    },
  ];

  return <TableRender columns={columns} data={data} onDelete onEdit onCreate />;
}
