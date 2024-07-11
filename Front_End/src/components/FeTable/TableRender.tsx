import React, { useEffect, useState } from "react";
import { Table, Button } from "antd";
import { CustomColumnType } from "@/types/TablePropsCustom";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ReloadOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { TTableResponse } from "@/types/Table";
import { DeleteOutlined } from "@mui/icons-material";
import Filter from "./Filter";

interface TableRenderProps<RecordType> {
  data: TTableResponse<RecordType>;
  columns: CustomColumnType<RecordType>[];
  onDelete?: (id: string | number) => void;
  onEdit?: any;
  onCreate?: any;
  rowSelection?: any;
  rowKey?: keyof RecordType;
  propsUrl: any;
}

const TableRender = <RecordType extends object>({
  data,
  columns,
  onDelete,
  onEdit,
  onCreate,
  rowKey,
  rowSelection,
  propsUrl,
}: TableRenderProps<RecordType>) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const finalRowKey: keyof RecordType = rowKey || ("id" as keyof RecordType);

  const meta = {
    current: propsUrl ? propsUrl.page : 1,
    pageSize: propsUrl ? propsUrl.limit : 10,
    total: data.total,
  };

  useEffect(() => {
    if (data) setIsFetching(false);
  }, [data]);

  const handleFilterChange = (key: string, value: any) => {
    const params = new URLSearchParams(searchParams);
    params.set(key, value);
    router.replace(`${pathname}?${params.toString()}`);
    setIsFetching(true);
  };

  const renderHeader = () => {
    const filteredColumns = columns.filter((column) => column.filter);

    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        {/* Filters area */}
        <div style={{ display: "flex", gap: "16px" }}>
          {filteredColumns.map((column, index) => (
            <div key={index}>
              <Filter column={column} onFilterChange={handleFilterChange} />
            </div>
          ))}
        </div>
        <Button
          icon={<PlusOutlined />}
          type="primary"
          onClick={() => router.push(`${pathname}/create`)}
        >
          Thêm mới
        </Button>

      </div>
    );
  };

  const updatedColumns: any = columns.map((column) => {
    // Clone column to avoid mutating original object
    let updatedColumn: CustomColumnType<RecordType> = { ...column };

    // Check if column has render function already defined
    if (!column.render) {
      // Define default render function if not provided
      updatedColumn.render = (value: any) => value;
    }

    return updatedColumn;
  });

  // Add delete button column
  if (onDelete) {
    updatedColumns.push({
      dataIndex: "delete",
      fixed: "right",
      width: 50,
      render: (_: any, record: RecordType) => (
        <Button
          type="link"
          icon={<DeleteOutlined style={{ fontSize: "20px", color: "green" }} />}
          onClick={() => onDelete(String(record[finalRowKey]))}
        >
          Xóa
        </Button>
      ),
    });
  }

  // Add edit button column
  if (onEdit) {
    updatedColumns.push({
      dataIndex: "edit",
      fixed: "right",
      width: 50,
      render: (_: any, record: RecordType) => (
        <Button
          type="link"
          icon={<EditOutlined style={{ fontSize: "18px" }} />}
          onClick={() => router.push(`${pathname}/${record[finalRowKey]}`)}
        >
          Chỉnh sửa
        </Button>
      ),
    });
  }

  const onChange = (
    pagination: any,
    _filters: any,
    _sorter: any,
    _extra: any
  ) => {
    if (pagination && pagination.current) {
      const params = new URLSearchParams(searchParams);
      params.set("page", pagination.current.toString());
      router.replace(`${pathname}?${params.toString()}`);
      setIsFetching(true);
    }
  };

  return (
    <Table
      rowSelection={rowSelection}
      dataSource={data.items}
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
      scroll={{ x: 1500 }}
      rowKey={(record) => String(record[finalRowKey])}
      columns={updatedColumns}
      onChange={onChange}
      title={renderHeader}
      loading={isFetching}
    />
  );
};

export default TableRender;