import {CreateCustomer, UpdateCustomer} from '../../../types/Customers';

export type CreateCustomerPayloadApiArg = {
  createCustomer: CreateCustomer;
};
export type CreateBulkCustomerPayloadApiArg = {
  createBulkCustomer: CreateCustomer[];
};
export type UpdateCustomerPayloadApiArg = {
  updateCustomer: UpdateCustomer;
};

export type SearchCustomerRecordPaginatedArg = {
  searchTerm?: string;
  page?: number;
  documentCount?: number;
};
