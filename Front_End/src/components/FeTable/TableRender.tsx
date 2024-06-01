"use client";

import { TTableResponse } from "@/types/Table";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Table } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface TRowSelection {
  type?: "checkbox" | "radio";
  onChange?: (selectedRowKeys: React.Key[], selectedRows: any[]) => void;
  selectedRowKeys?: React.Key[];
}

interface IProps {
  data: TTableResponse<any>;
  columns: any[];
  propsUrl?: any;
  rowKey?: string;
  onDelete?: any;
  onCreate?: any;
  onEdit?: any;
  rowSelection?: TRowSelection;
}

const TableRender = (props: IProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const router = useRouter();
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const {
    data,
    columns,
    rowKey = "id",
    onEdit,
    onDelete,
    propsUrl,
    rowSelection,
    onCreate,
  } = props;
  const meta = {
    current: propsUrl ? propsUrl.page : 1,
    pageSize: propsUrl ? propsUrl.size : 10,
    total: data.total,
  };
  useEffect(() => {
    if (data) setIsFetching(false);
  }, [data]);

  const onChange = (pagination: any, filters: any, sorter: any, extra: any) => {
    if (pagination && pagination.current) {
      const params = new URLSearchParams(searchParams);
      params.set("page", pagination.current);
      replace(`${pathname}?${params.toString()}`);
      setIsFetching(true);
    }
  };
  const initialColumns = Array.isArray(columns) ? columns : [];

  let updatedColumns = [...initialColumns];
  if (onDelete) {
    updatedColumns.push({
      dataIndex: "delete",
      fixed: "right",
      width: 100,
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
      width: 100,
      render: (_: any, record: any) => (
        <a onClick={() => router.push(pathname!.concat(`/${record[rowKey!]}`))}>
          <EditOutlined style={{ fontSize: "32px" }} />
        </a>
      ),
    });
  }

  const renderHeader = () => {
    return (
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span></span>
        <Button
          icon={<PlusOutlined />}
          type="primary"
          onClick={() => router.push(pathname!.concat(`/create`))}
        >
          Thêm mới
        </Button>
      </div>
    );
  };

  return (
    <>
      <Table
        title={onCreate ? renderHeader : undefined}
        rowSelection={rowSelection ? { ...rowSelection } : undefined}
        loading={isFetching}
        rowKey={rowKey}
        dataSource={data.items}
        columns={updatedColumns}
        onChange={onChange}
        scroll={{ x: 1500 }}
        pagination={{
          ...meta,
          showTotal: (total, range) => {
            return (
              <div>
                {" "}
                {range[0]}-{range[1]} trên {total} rows
              </div>
            );
          },
        }}
      />
    </>
  );
};

export default TableRender;
