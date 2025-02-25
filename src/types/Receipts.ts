import {ReceiptStatusTypes} from '../utils/constants/status';
import {Business} from './Business';
import {CustomerData} from './Customers';
import {Products} from './Invoices';

interface Receipt {
  products: Products[];
  useDefaultReceiptNote: boolean;
  useDefaultReceiptTerms: boolean;
  type: string;
  _id: string;
  account: string;
  customerId: string;
  businessId: string;
  receiptTo: string;
  receiptNumber: string;
  receiptDate: string;
  receiptNote: string;
  receiptTerms: string;
  receiptSubject: string;
  subTotal: string;
  discount: string;
  tax: string;
  taxAmount: string;
  grandTotal: string;
  currency: string;
  paymentMode: ReceiptStatusTypes;
  createdAt: string;
  __v: number;
  id: string;
  customerData: CustomerData;
  businessData: Business;
}

type CreateReceipt = Pick<
  Receipt,
  | 'products'
  | 'receiptDate'
  | 'receiptSubject'
  | 'subTotal'
  | 'discount'
  | 'tax'
  | 'taxAmount'
  | 'grandTotal'
  | 'currency'
  | 'paymentMode'
  | 'receiptNote'
  | 'useDefaultReceiptNote'
> & {
  receiptFrom: string;
  receiptTo?: {
    email?: string;
    name?: string;
    phone?: string;
    address?: string | null;
  };
  email?: string;
  name?: string;
  phone?: string;
  address?: string | null;
};

type UpdateReceipt = CreateReceipt & {receiptId: string};

export type {Receipt, CreateReceipt, UpdateReceipt};
