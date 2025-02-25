import {Dispatch, SetStateAction} from 'react';

export interface Customer {
  status: string | null;
  createdAt: string;
  _id: string;
  account: string;
  name: string;
  email: string;
  companyName: string | null;
  address: string | null;
  phone: string | null;
  state: string | null;
  city: string | null;
  country: string;
  amountBilled: number;
  outstandingBalance: number;
  currencySymbol: string;
  website?: string | null;
  DOB: string | null;
  businessName: string;
  taxRate?: string;
  currency: string | null;
  __v: number;
  id: string;
  sameAsClientAddress: boolean;
  clientId: string;
  zipCode: number | null;
  billingAddress: string | null;
  billingState: string | null;
  billingCity: string | null;
  billingCountry: string;
  billingZipCode: string | number | null;
}

export type PaginatedCustomerSearchSearch = {
  page: string;
  prevPage: string | null;
  nextPage: string | null;
  totalRecords: number;
  pageCount: number;
  allRecordData: Customer[];
};

export interface CustomerData {
  status: string;
  sameAsClientAddress: boolean;
  createdAt: string;
  _id: string;
  account: string;
  email: string;
  name: string;
  phone: string;
  businessName: string;
  taxRate: string;
  address: string | null;
  __v: number;
  id: string;
}

export type CreateCustomer = Pick<
  Customer,
  | 'name'
  | 'email'
  | 'phone'
  | 'address'
  | 'businessName'
  | 'website'
  | 'taxRate'
  | 'country'
>;

export type CustomerMetrics = {
  totalCustomers: number;
};

export type UpdateCustomer = CreateCustomer & {customerId: string};

export type DispatchSetCustomer = Dispatch<SetStateAction<Customer | null>>;
