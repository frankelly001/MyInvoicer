import {CreateInvoice, UpdateInvoice} from '../../../types/Invoices';
import {InvoiceStatusTypes} from '../../../utils/constants/status';

export type CreateInvoicePayloadApiArg = {
  createInvoice: CreateInvoice;
};
export type CommonInvoicePayloadApiArg = {
  invoiceId: string;
};
export type DeleteMultipleInvoicePayloadApiArg = {
  arrayOfInvoiceId: string[];
};
export type SaveInvoiceAsDraftPayloadApiArg = {
  saveInvoiceAsDraft: CreateInvoice;
};
export type CompleteDraftedInvoicePayloadApiArg = {
  completeDraftedInvoice: UpdateInvoice;
};

export type GetInvoiceByStatusPayloadApiArg = {
  page?: number;
  recordStatus: InvoiceStatusTypes;
};
