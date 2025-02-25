import {OrderStatusTypes} from '../utils/constants/status';
import {Business} from './Business';
import {CustomerData} from './Customers';
import {Products} from './Invoices';

type OrderStatus = 'draft' | 'pending' | 'declined' | 'accepted' | 'expired';

interface Order {
  products: Array<Products>;
  useDefaultOrderNote: boolean;
  type: string;
  dueNotice: boolean;
  useDefaultOrderTerms: boolean;
  createdAt: string;
  _id: string;
  account: string;
  customerId: string;
  businessId: string;
  orderTo: string;
  orderNumber: string;
  orderExpiryDate: string;
  orderDate: string;
  orderNote: string;
  orderTerms: string;
  orderSubject: string;
  amountDeposited: string;
  tax: string;
  taxAmount: string;
  subTotal: string;
  grandTotal: string;
  currency: string;
  discount: string;
  orderStatus: OrderStatusTypes;
  __v: number;
  id: string;
  businessData: Business;
  customerData: CustomerData;
}

type CreateOrder = Pick<
  Order,
  | 'products'
  | 'orderDate'
  | 'orderExpiryDate'
  | 'orderSubject'
  | 'subTotal'
  | 'discount'
  | 'amountDeposited'
  | 'grandTotal'
  | 'currency'
  | 'discount'
  | 'orderNote'
  | 'orderTerms'
  | 'useDefaultOrderNote'
  | 'useDefaultOrderTerms'
> & {
  orderFrom: string;
  orderStatus?: string | null;
  orderTo?: {
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

type UpdateOrder = CreateOrder & {orderId: string};

type OrderMetrics = {
  totalOrders: number;
  totalOrdersSent: number;
  totalOrdersAccepted: number;
  totalOrdersPending: number;
  totalOrdersExpired: number;
  totalOrdersDrafted: number;
};

export type {Order, CreateOrder, UpdateOrder, OrderMetrics, OrderStatus};
