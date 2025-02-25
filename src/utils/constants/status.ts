/* eslint-disable @typescript-eslint/no-shadow */
import {COLOR_TYPES} from '../../config/const';
export type InvoiceStatusTypes = 'pending' | 'overdue' | 'draft' | 'paid';
export type EstimateStatusTypes =
  | 'pending'
  | 'expired'
  | 'accepted'
  | 'declined'
  | 'draft';
export type OrderStatusTypes =
  | 'pending'
  | 'expired'
  | 'accepted'
  | 'declined'
  | 'draft';
export type ReceiptStatusTypes = 'transfer' | 'online' | 'card' | 'cash';
export type TimesheetStatusTypes = 'billed' | 'unbilled';

type AllStatusTypes =
  | InvoiceStatusTypes
  | EstimateStatusTypes
  | OrderStatusTypes
  | TimesheetStatusTypes
  | ReceiptStatusTypes;

export const statusStyles: {
  [key in AllStatusTypes]: {[key in 'color1' | 'color2']: COLOR_TYPES};
} = {
  paid: {color1: 'support_sucess_1', color2: 'support_sucess_3'},
  accepted: {color1: 'support_sucess_1', color2: 'support_sucess_3'},
  overdue: {color1: 'support_warning_1', color2: 'support_warning_3'},
  declined: {color1: 'support_error_1', color2: 'support_error_3'},
  draft: {color1: 'neutral_light_3', color2: 'neutral_dark_4'},
  expired: {color1: 'support_error_1', color2: 'support_error_3'},
  pending: {color1: 'support_warning_1', color2: 'support_warning_3'},
  billed: {color1: 'support_sucess_1', color2: 'support_sucess_3'},
  unbilled: {color1: 'support_warning_1', color2: 'support_warning_3'},
  online: {color1: 'neutral_light_3', color2: 'neutral_dark_4'},
  card: {color1: 'neutral_light_3', color2: 'neutral_dark_4'},
  cash: {color1: 'neutral_light_3', color2: 'neutral_dark_4'},
  transfer: {color1: 'neutral_light_3', color2: 'neutral_dark_4'},
};
