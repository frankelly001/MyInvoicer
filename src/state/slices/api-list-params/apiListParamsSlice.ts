import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../store';
import {
  ApiListParamsState,
  CustomerParamsPayload,
  EstimateParamsPayload,
  InvoiceParamsPayload,
  ItemParamsayload,
  OrderParamsPayload,
  ReceiptParamsPayload,
  NotificationParamsayload,
  BusinessParamsayload,
  TimeSheetParamsPayload,
} from './types';

const initialState: ApiListParamsState = {
  invoiceApiListParams: {
    sent: {page: 1, documentCount: 20},
    received: {page: 1, documentCount: 20},
  },
  estimateApiListParams: {
    sent: {page: 1, documentCount: 20},
    received: {page: 1, documentCount: 20},
  },
  orderApiListParams: {
    sent: {page: 1, documentCount: 20},
    received: {page: 1, documentCount: 20},
  },
  receiptApiListParams: {
    sent: {page: 1, documentCount: 20},
    received: {page: 1, documentCount: 20},
  },
  businessApiListParams: {page: 1, documentCount: 20},
  customerApiListParams: {page: 1, documentCount: 20},
  itemApiListParams: {page: 1, documentCount: 20},
  notificationApiListParams: {page: 1, documentCount: 20},
  timesheetApiListParams: {page: 1, documentCount: 20},
};

const apiListParamsSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCustomerApiListParams: (state, {payload}: CustomerParamsPayload) => {
      state.customerApiListParams = {
        ...state.customerApiListParams,
        ...payload,
      };
    },
    setTimesheetApiListParams: (state, {payload}: TimeSheetParamsPayload) => {
      state.timesheetApiListParams = {
        ...state.timesheetApiListParams,
        ...payload,
      };
    },
    setItemApiListParams: (state, {payload}: ItemParamsayload) => {
      state.itemApiListParams = {
        ...state.itemApiListParams,
        ...payload,
      };
    },
    setNotificationApiListParams: (
      state,
      {payload}: NotificationParamsayload,
    ) => {
      state.notificationApiListParams = {
        ...state.notificationApiListParams,
        ...payload,
      };
    },
    setBusinessApiListParams: (state, {payload}: BusinessParamsayload) => {
      state.businessApiListParams = {
        ...state.businessApiListParams,
        ...payload,
      };
    },
    setInvoiceApiListParams: (state, {payload}: InvoiceParamsPayload) => {
      state.invoiceApiListParams[payload.type] = {
        ...state.invoiceApiListParams[payload.type],
        ...payload.params,
      };
    },
    setEstimateApiListParams: (state, {payload}: EstimateParamsPayload) => {
      state.estimateApiListParams[payload.type] = {
        ...state.estimateApiListParams[payload.type],
        ...payload.params,
      };
    },
    setOrderApiListParams: (state, {payload}: OrderParamsPayload) => {
      state.orderApiListParams[payload.type] = {
        ...state.orderApiListParams[payload.type],
        ...payload.params,
      };
    },
    setReceiptApiListParams: (state, {payload}: ReceiptParamsPayload) => {
      state.receiptApiListParams[payload.type] = {
        ...state.receiptApiListParams[payload.type],
        ...payload.params,
      };
    },
  },
});

export const {
  setCustomerApiListParams,
  setEstimateApiListParams,
  setInvoiceApiListParams,
  setOrderApiListParams,
  setReceiptApiListParams,
  setItemApiListParams,
  setBusinessApiListParams,
  setNotificationApiListParams,
  setTimesheetApiListParams,
} = apiListParamsSlice.actions;

export const apiListParamsState = (state: RootState): ApiListParamsState =>
  state.apiListParamsReducer;

export default apiListParamsSlice.reducer;
