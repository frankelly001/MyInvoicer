import {CreateTimeSheet, UpdateTimeSheet} from '../../../types/TimeSheet';
import {TimesheetStatusTypes} from '../../../utils/constants/status';

export type CreateTimesheetPayloadApiArg = {
  createTimesheet: CreateTimeSheet;
};

export type UpdateTimeSheetPayloadApiArg = {
  updateTimeSheet: UpdateTimeSheet;
};

export type CommonTimeSheetPayloadApiArg = {
  timeSheetId: string;
};

export type DeleteMultipleTimeSheetPayloadApiArg = {
  arrayOfTimeSheetId: string[];
};

export type GetTimeSheetByStatusPayloadApiArg = {
  page?: number;
  recordStatus: TimesheetStatusTypes;
};
