import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ItemsSchemaType} from '../../screens/stack-screen/create-edit/common/bill-form-screen/schema';
import {BillToProps} from '../../types/Billing';
import {Business} from '../../types/Business';
import {Customer} from '../../types/Customers';
import {Estimate} from '../../types/Estimates';
import {Invoice} from '../../types/Invoices';
import {Order} from '../../types/Orders';
import {Receipt} from '../../types/Receipts';

export type RootStackParamList = {
  AUTH_STACK: undefined;
  BOTTOM_TAB: undefined;
  CUSTOMER_DETAILS: {customerId: string; customerName: string};
  BUSINESS_DETAILS: {business: {id: string; name: string}};
  PROFILE: undefined;
  CREATE_CUSTOMER: undefined;
  EDIT_CUSTOMER: {customer: Customer};
  CREATE_INVOICE?: {
    billTo?: BillToProps;
    timesheetId?: string;
    currency?: string;
    items?: ItemsSchemaType;
    duplicate?: Invoice;
  };
  EDIT_INVOICE: {invoice: Invoice};
  CREATE_ESTIMATE?: {
    billTo?: BillToProps;
    duplicate?: Estimate;
  };
  EDIT_ESTIMATE: {estimate: Estimate};
  CREATE_SALES_RECEIPT?: {
    billTo?: BillToProps;
    duplicate?: Receipt;
  };
  EDIT_SALES_RECEIPT: {receipt: Receipt};
  CREATE_PURCHASE_ORDER?: {
    billTo?: BillToProps;
    duplicate?: Order;
  };
  EDIT_PURCHASE_ORDER: {order: Order};
  PREVIEW_INVOICE: {invoiceId: string};
  PREVIEW_ESTIMATE: {estimateId: string};
  PREVIEW_PURCHASE_ORDER: {orderId: string};
  PREVIEW_SALES_RECEIPT: {receiptId: string};
  ADD_BUSINESS: undefined;
  EDIT_BUSINESS: {business: Business};
  PAYMENT_METHOD: undefined;
  PAYMENT_PLAN: undefined;
  NOTIFICATIONS: undefined;
  MY_BUSINESS: undefined;
};
export type RootStackNavigationProps<T extends keyof RootStackParamList> =
  NativeStackNavigationProp<RootStackParamList, T>;

export type RootStackRouteProps<T extends keyof RootStackParamList> = RouteProp<
  RootStackParamList,
  T
>;
export type RootScreenProps<T extends keyof RootStackParamList> = {
  navigation: NativeStackNavigationProp<RootStackParamList, T>;
  route: RouteProp<RootStackParamList, T>;
};
