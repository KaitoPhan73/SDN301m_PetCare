// src/components/Filter.tsx

import React from "react";
import { DatePicker, Input, Select } from "antd";
import { CustomColumnType } from "@/types/TablePropsCustom";

interface FilterProps<RecordType> {
  column: CustomColumnType<RecordType>;
  onFilterChange: (key: string, value: any) => void;
}

const Filter = <RecordType extends object>({
  column,
  onFilterChange,
}: FilterProps<RecordType>) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange(column.dataIndex as string, e.target.value);
  };

  const handleSelectChange = (value: any) => {
    onFilterChange(column.dataIndex as string, value);
  };

  const getDateFormat = () => {
    if (column.filter && column.filter.type === "date") {
      return "YYYY-MM-DD";
    } else if (column.filter && column.filter.type === "datetime") {
      return "DD-MM-YYYY HH:mm:ss";
    }
    return undefined;
  };

  return (
    <div>
      {/* <span>
        {typeof column.title === "function" ? column.title({}) : column.title}:
      </span> */}
      {column.filter && column.filter.type === "text" ? (
        <Input
          placeholder={column.filter.placeholder}
          onChange={handleInputChange}
        />
      ) : column.filter && column.filter.type === "select" ? (
        <Select
          defaultValue=""
          onChange={handleSelectChange}
          showSearch
          placeholder={column.filter.placeholder}
          style={{ width: 150 }}
        >
          {column.filter.options?.map((option) => (
            <Select.Option key={option.value} value={option.value}>
              {option.label}
            </Select.Option>
          ))}
        </Select>
      ) : column.filter &&
        (column.filter.type === "date" || column.filter.type === "datetime") ? (
        <DatePicker
          onChange={(date, dateString) =>
            onFilterChange(column.dataIndex as string, dateString)
          }
          format={getDateFormat()} // Set format based on type
          showTime={column.filter.type === "datetime"} // Show time if datetime type
        />
      ) : column.filter && column.filter.type === "sorter" ? (
        <Select defaultValue="" onChange={handleSelectChange}>
          <Select.Option value="">Không sắp xếp</Select.Option>
          <Select.Option value="ascend">Sắp xếp tăng dần</Select.Option>
          <Select.Option value="descend">Sắp xếp giảm dần</Select.Option>
        </Select>
      ) : null}
    </div>
  );
};

export default Filter;