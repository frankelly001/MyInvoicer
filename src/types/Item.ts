interface Item {
  description: string;
  _id: string;
  account: string;
  name: string;
  unit: string;
  currency: string;
  price: string;
  createdAt: string;
  __v: number;
  id: string;
}

export type PaginatedItemSearchSearch = {
  itemsData: Item[];
  nextPage: string | null;
  page: string;
  pageCount: number;
  prevPage: string | null;
  totalRecords: number;
};

interface ProductItems {
  productName: string;
  quantity: string | number;
  price: string;
  description: string;
  unit: string;
}

type CreateItem = Pick<
  Item,
  'name' | 'description' | 'unit' | 'currency' | 'price'
>;

type UpdateItem = CreateItem & {itemId: string};

export type {Item, ProductItems, CreateItem, UpdateItem};
