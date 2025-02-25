import {TimeSheetStatus} from '../../../types/TimeSheet';
import {
  EstimateStatusTypes,
  InvoiceStatusTypes,
  OrderStatusTypes,
  ReceiptStatusTypes,
} from '../../../utils/constants/status';
import {GetAllBusinessesPayloadApiArg} from '../../services/business/type';
import {GetAllRecordsPayloadApiArg} from '../../services/general/type';
import {GetAllNotificationPayloadApiArg} from '../../services/notification/type';

export type ApiListParamsState = {
  invoiceApiListParams: {
    sent: GetAllRecordsPayloadApiArg<InvoiceStatusTypes>;
    received: GetAllRecordsPayloadApiArg<InvoiceStatusTypes>;
  };
  estimateApiListParams: {
    sent: GetAllRecordsPayloadApiArg<EstimateStatusTypes>;
    received: GetAllRecordsPayloadApiArg<EstimateStatusTypes>;
  };
  orderApiListParams: {
    sent: GetAllRecordsPayloadApiArg<OrderStatusTypes>;
    received: GetAllRecordsPayloadApiArg<OrderStatusTypes>;
  };
  receiptApiListParams: {
    sent: GetAllRecordsPayloadApiArg<ReceiptStatusTypes>;
    received: GetAllRecordsPayloadApiArg<ReceiptStatusTypes>;
  };
  businessApiListParams: GetAllBusinessesPayloadApiArg;
  itemApiListParams: GetAllRecordsPayloadApiArg<never> & {currency?: string};
  customerApiListParams: GetAllRecordsPayloadApiArg<never>;
  notificationApiListParams: GetAllNotificationPayloadApiArg;
  timesheetApiListParams: GetAllRecordsPayloadApiArg<TimeSheetStatus>;
};

export type CustomerParamsPayload = {
  payload: GetAllRecordsPayloadApiArg<never>;
};
export type TimeSheetParamsPayload = {
  payload: GetAllRecordsPayloadApiArg<TimeSheetStatus>;
};
export type ItemParamsayload = {
  payload: GetAllRecordsPayloadApiArg<never> & {currency?: string};
};
export type NotificationParamsayload = {
  payload: GetAllNotificationPayloadApiArg;
};
export type BusinessParamsayload = {
  payload: GetAllBusinessesPayloadApiArg;
};
type BillListParamsPayload<T> = {
  payload: {
    type: 'sent' | 'received';
    params: GetAllRecordsPayloadApiArg<T>;
  };
};
export type InvoiceParamsPayload = BillListParamsPayload<InvoiceStatusTypes>;
export type EstimateParamsPayload = BillListParamsPayload<EstimateStatusTypes>;
export type OrderParamsPayload = BillListParamsPayload<OrderStatusTypes>;
export type ReceiptParamsPayload = BillListParamsPayload<ReceiptStatusTypes>;
