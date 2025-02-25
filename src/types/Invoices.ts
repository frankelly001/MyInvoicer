import {InvoiceStatusTypes} from '../utils/constants/status';
import {Profile} from './Authentication';
import {Business} from './Business';
import {CustomerData} from './Customers';
export interface Products {
  productName: string;
  description: string;
  unit: string;
  price: string;
  quantity: number;
  total: string;
}

export interface Invoice {
  products: Array<Products>;
  customerData: CustomerData;
  accountData: Profile;
  businessData: Business;
  createdAt: string;
  _id: string;
  account: string;
  clientId: string;
  invoiceFrom: string;
  invoiceNumber: string;
  invoiceSubject: string;
  invoiceNote: string | null;
  dueDate: string;
  issuedDate: string;
  currency: string;
  signer: string;
  signerRole: string;
  subTotal: string;
  discount: string | null;
  tax: string | null;
  taxAmount: string | null;
  grandTotal: string;
  invoiceStatus: InvoiceStatusTypes;
  useDefaultInvoiceNote: boolean;
  useDefaultInvoiceTerms: boolean;
  type: string;
  dueNotice: boolean;
  customerId: string;
  invoiceTo: string;
  businessId: string;
  invoiceTerms: string;
  amountDeposited?: string;
  paymentMode: string;
  __v: number;
  id: string;
}

export interface InvoiceItems {
  productName: string;
  description: string;
  quantity: string | number;
  price: string;
  unit: string;
}

export type CreateInvoice = Pick<
  Invoice,
  | 'products'
  | 'dueDate'
  | 'issuedDate'
  | 'subTotal'
  | 'discount'
  | 'tax'
  | 'taxAmount'
  | 'grandTotal'
  | 'invoiceNote'
  | 'invoiceFrom'
  | 'invoiceTerms'
  | 'invoiceSubject'
  | 'currency'
  | 'useDefaultInvoiceNote'
  | 'useDefaultInvoiceTerms'
  | 'amountDeposited'
  | 'paymentMode'
  | 'invoiceStatus'
> & {
  timesheetId?: string;
  invoiceTo: {
    email: string;
    name: string;
    phone: string;
    address: string | null;
  };
};

export type UpdateInvoice = CreateInvoice & {invoiceId: string};

export interface InvoiceMetrics {
  totalInvoices: number;
  totalInvoicesSent: number;
  totalInvoicesPaid: number;
  totalInvoicesPending: number;
  totalInvoicesOverdue: number;
  totalInvoicesDrafted: number;
  totalInvoicesExpired: number;
}
