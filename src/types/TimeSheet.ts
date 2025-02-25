import {TimesheetStatusTypes} from '../utils/constants/status';

type TimeSheetStatus = 'billed' | 'unbilled';
export type BillToCustomerData = {
  createdAt: string;
  _id: string;
  account: string;
  name: string;
  email: string;
  address: string;
  phone: string;
  __v: number;
  id: string;
};

interface TimeSheet {
  timesheetStatus: TimeSheetStatus;
  createdAt: string;
  _id: string;
  account: string;
  invoiceId: string;
  billTo: BillToCustomerData;
  title: string;
  note: string;
  rate: string;
  currency: string;
  time: string;
  __v: 0;
  id: string;
}

type CreateTimeSheet = Pick<TimeSheet, 'title' | 'time' | 'note'> & {
  billTo: string;
  timesheetStatus?: TimeSheetStatus;
  rate: string;
  currency: string;
};

type UpdateTimeSheet = CreateTimeSheet & {timesheetId: string};

type TimesheetToBillResponse = {
  timesheetStatus: TimesheetStatusTypes;
  createdAt: string;
  _id: string;
  account: string;
  invoiceId: string;
  billTo: string;
  title: string;
  note: string;
  time: string;
  __v: number;
  id: string;
};

export type {
  TimeSheet,
  CreateTimeSheet,
  UpdateTimeSheet,
  TimeSheetStatus,
  TimesheetToBillResponse,
};
