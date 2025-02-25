import {
  EstimateStatusTypes,
  InvoiceStatusTypes,
} from '../utils/constants/status';
import {Business} from './Business';
import {Customer, CustomerData} from './Customers';
import {Products} from './Invoices';

export type BillType = 'invoice' | 'estimate' | 'receipt' | 'order';

export interface Billing {
  products: Array<Products>;
  businessData: Business;
  customerData: Customer;
  useDefaultInvoiceNote: boolean;
  useDefaultInvoiceTerms: boolean;
  type: BillType;
  dueNotice: boolean;
  _id: string;
  account: string;
  customerId: string;
  invoiceTo: string;
  businessId: string;
  invoiceNumber: string;
  estimateNumber: string;
  dueDate: string;
  issuedDate: string;
  invoiceNote: string;
  invoiceTerms: string;
  invoiceSubject: string;
  amountDeposited: string;
  subTotal: string;
  discount: string;
  tax: string;
  taxAmount: string;
  grandTotal: string;
  currency: string;
  invoiceStatus: InvoiceStatusTypes;
  estimateStatus: EstimateStatusTypes;
  createdAt: string;
  __v: number;
  id: string;
}

export interface CustomerBilling<T> {
  billings: T;
  currency: string;
  customerData: CustomerData;
  outStandingBalance: number;
  totalBillAmount: number;
}

export interface BillingMetrics {
  totalBillings: number;
  currency: string;
  totalPaidInvoices: number;
  totalPaidAmount: number;
  totalPendingInvoices: number;
  totalPendingAmount: number;
  totalOverdueInvoices: number;
  totalOverdueAmount: number;
}

export type BillToProps = {
  fullname: string;
  email: string;
  phone: string;
  address: string;
};
