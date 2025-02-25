import {CreateItem, UpdateItem} from '../../../types/Item';

export type CreateItemPayloadApiArg = {
  createItem: CreateItem;
};
export type UpdateItemPayloadApiArg = {
  updateItem: UpdateItem;
};
export type CommonItemPayloadApiArg = {
  itemId: string;
};
export type DeleteMultipleItemPayloadApiArg = {
  arrayOfItemId: string[];
};

export type SearchItemRecordArg = {
  searchTerm?: string;
  currency?: string;
  page?: number;
  documentCount?: number;
};
