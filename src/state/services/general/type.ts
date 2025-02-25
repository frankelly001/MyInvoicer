export type GetAllRecordsPayloadApiArg<T> = {
  page?: number;
  recordStatus?: T | null;
  filter?: 'newest' | 'oldest';
  documentCount?: number;
};
export type GetAllRecordsByOldestOrNewestPayloadApiArg = {
  page?: number;
  filter: 'newest' | 'oldest';
};
export type CommonCustomerPayloadApiArg = {
  customerId: string;
};
export type GetDashBoardBillingsPayloadApiArg = {
  businessId: string;
};
export type DeleteMultipleCustomersPayloadApiArg = {
  arrayOfCustomerId: string[];
};

export type GeneralSearchRecordArg = {
  searchTerm: string;
};
