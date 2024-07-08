import { DatePickerProps, SelectProps } from "antd";

export type CustomDataIndex<RecordType> =
  | keyof RecordType
  | "index"
  | "delete"
  | "edit";

export interface RenderedCell<RecordType> {
  children?: React.ReactNode;
  props?: any; // Adjust as per your actual usage
}

export interface FilterOptions {
  type: "text" | "select" | "date" | "datetime" | "sorter";
  placeholder?: string;
  options?: { label: string; value: any }[];
}

export type CustomColumnType<RecordType> = {
  title: string | ((params: any) => React.ReactNode);
  dataIndex: CustomDataIndex<RecordType>; // Adjusted to CustomDataIndex type
  key: CustomDataIndex<RecordType> | string; // Adjusted to CustomDataIndex type
  fixed?: any;
  width?: string | number;
  render?: (
    value: any,
    record: RecordType,
    index: number
  ) => React.ReactNode | RenderedCell<RecordType>;
  filter?: FilterOptions;
} & (
  | {
      filterDropdown?: React.ReactNode;
      filterIcon?: React.ReactNode;
      onFilter?: (value: any, record: RecordType) => boolean;
      onFilterDropdownVisibleChange?: (visible: boolean) => void;
    }
  | {
      sorter?: boolean | ((a: any, b: any) => number);
      defaultSortOrder?: "ascend" | "descend";
      sortDirections?: ("ascend" | "descend")[];
    }
);