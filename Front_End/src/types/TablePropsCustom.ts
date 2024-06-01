import { TableProps } from "antd";

type KeyOfT<T> = keyof T;

export type TablePropsCustom<T> = Omit<TableProps<T>, "dataIndex"> & {
  dataIndex?: KeyOfT<T> | "index";
  fixed?: boolean;
};
