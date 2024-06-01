export interface TInvoiceDetail {
  itemType: number;
  lineNumber: number;
  sortOrder: number;
  itemCode: string;
  itemName: string;
  unitName: string;
  quantity: number;
  unitPrice: number;
  discountRate: number;
  discountAmountOC: number;
  discountAmount: number;
  amountOC: number;
  amount: number;
  amountWithoutVATOC: number;
  amountWithoutVAT: number;
  vatRateName: string;
  vatAmountOC: number;
  vatAmount: number;
}

export interface TInvoice {
  id: string;
  invoiceCode: string;
  createdDate: string;
  updatedDate: string;
  type: number;
  status: number;
  paymentMethod: string;
  currencyCode: string;
  exchangeRate: number;
  discountRate: number;
  vatrate: number;
  totalSaleAmount: number;
  totalDiscountAmount: number;
  totalAmountWithoutVat: number;
  totalVatamount: number;
  totalAmount: number;
  paymentStatus: number;
  templateId: string;
  invoiceDetails: TInvoiceDetail[];
  partnerId: string;
  storeId: string;
}
