import {CreateReceipt, UpdateReceipt} from '../../../types/Receipts';
import {ReceiptStatusTypes} from '../../../utils/constants/status';

export type CreateReceiptPayloadApiArg = {
  createReceipt: CreateReceipt;
};

export type UpdateReceiptPayloadApiArg = {
  updateReceipt: UpdateReceipt;
};

export type CommonReceiptPayloadApiArg = {
  receiptId: string;
};

export type DeleteMultipleReceiptPayloadApiArg = {
  arrayOfReceiptId: string[];
};

export type GetReceiptByStatusPayloadApiArg = {
  page?: number;
  recordStatus: ReceiptStatusTypes;
};
