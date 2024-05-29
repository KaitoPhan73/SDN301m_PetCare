import TableRender from "@/components/FeTable/TableRender";
import { TInvoice } from "@/types/Invoice";
import { TableColumnsType } from "antd";
import React from "react";
interface Props {
  props: any;
  data: any;
}
export default function InvoicePage({ props, data }: Props) {
  const columns: TableColumnsType<TInvoice> = [
    {
      title: "Mã",
      dataIndex: "invoiceCode",
    },
    {
      title: "Phương thức thanh toán",
      dataIndex: "paymentMethod",
    },
    {
      title: "Mã tiền tệ",
      dataIndex: "currencyCode",
    },
    {
      title: "Tỉ giá",
      dataIndex: "exchangeRate",
    },
    {
      title: "Tỉ lệ chiết khấu",
      dataIndex: "discountRate",
    },
    {
      title: "Tỉ lệ VAT",
      dataIndex: "vatrate",
    },
    {
      title: "Tổng giá trị bán hàng",
      dataIndex: "totalSaleAmount",
    },
    {
      title: "Tổng giá trị chiết khấu",
      dataIndex: "totalDiscountAmount",
    },
    {
      title: "Tổng giá trị không bao gồm VAT",
      dataIndex: "totalAmountWithoutVat",
    },
    {
      title: "Tổng giá trị VAT",
      dataIndex: "totalVatamount",
    },
    {
      title: "Tổng giá trị",
      dataIndex: "totalAmount",
    },
  ];
  return <TableRender columns={columns} data={data} onDelete onEdit onCreate />;
}
