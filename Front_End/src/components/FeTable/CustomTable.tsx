"use client";
import { Form, Table } from "antd";
import React from "react";
import { useAntdTable } from "ahooks";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { usePathname, useRouter } from "next/navigation";

interface Props {
  columns: any[];
  props: any;
  rowSelection?: RowSelectionType;
  onEdit?: boolean;
  onDelete?: any;
  rowKey?: string;
  dataSource?: any[];
  getData?: (params?: any) => Promise<any>;
}
interface Result {
  total: number;
  list: any[];
}
interface Params {
  current: number;
  pageSize: number;
}
interface RowSelectionType {
  type?: "checkbox" | "radio";
  onChange?: (selectedRowKeys: React.Key[], selectedRows: any[]) => void;
  selectedRowKeys?: React.Key[];
}

const CustomTable = ({
  columns,
  props,
  rowSelection,
  onEdit,
  onDelete,
  rowKey,
  dataSource,
  getData,
}: Props) => {
  const [form] = Form.useForm();
  const getDataTable = async (
    { current, pageSize }: Params,
    formData: Object
  ): Promise<Result> => {
    let query = `?page=${current}&limit=${pageSize}`;
    Object.entries(formData).forEach(([key, value]) => {
      if (value) {
        query += `&${key}=${value}`;
      }
    });
    if (dataSource) {
      // const paginatedData = dataSource.slice(
      //   (current - 1) * pageSize,
      //   current * pageSize
      // );
      return {
        total: dataSource.length,
        list: dataSource,
      };
    } else if (getData) {
      const data = await getData(formData);
      return {
        total: data.payload.total,
        list: data.payload.items,
      };
    } else {
      throw new Error("Either dataSource or getData must be provided.");
    }
  };

  const { tableProps } = useAntdTable(getDataTable, {
    form,
    defaultParams: [
      { current: 1, pageSize: 2 },
      { name: "hello", email: "abc@gmail.com", gender: "female" },
    ],
    defaultType: "advance",
  });
  console.log("tableProps", tableProps);
  const router = useRouter();
  const pathname = usePathname();
  const { replace } = useRouter();

  const onChange = (pagination: any, filters: any, sorter: any, extra: any) => {
    tableProps.onChange?.(pagination, filters, sorter);
    if (pagination && pagination.current) {
      const params = new URLSearchParams(pagination);
      replace(`${pathname}?${params.toString()}`);
      params.set("page", pagination.current);
    }
  };

  const initialColumns = Array.isArray(columns) ? columns : [];

  let updatedColumns = [...initialColumns];
  if (onDelete) {
    updatedColumns.push({
      dataIndex: "delete",
      fixed: "right",
      render: (_: any, record: any) => (
        <DeleteOutlined
          style={{ fontSize: "32px", color: "red" }}
          onClick={() => onDelete(record[rowKey!])}
        />
      ),
    });
  }

  if (onEdit) {
    updatedColumns.push({
      dataIndex: "edit",
      fixed: "right",
      render: (_: any, record: any) => (
        <a onClick={() => router.push(pathname!.concat(`/${record[rowKey!]}`))}>
          <EditOutlined style={{ fontSize: "32px" }} />
        </a>
      ),
    });
  }

  return (
    <Table
      columns={updatedColumns}
      rowSelection={rowSelection ? { ...rowSelection } : undefined}
      rowKey={rowKey}
      style={{ overflow: "auto" }}
      {...tableProps}
      onChange={onChange}
    />
  );
};
export default CustomTable;
