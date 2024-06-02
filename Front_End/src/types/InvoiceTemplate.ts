export type TInvoiceTemplateBase = {
  id: string;
  organizationId: string;
  organizationName: string;
  templateName: string;
  templateType: number;
  invSeries: string;
  invoiceType: number;
  status: number;
};
