import {AddBillItemSchemaType} from './add-Items/add-item-form-sheet/schema';

export type BillFieldValues = {
  phone: string;
  address: string;
  email: string;
  issueDate: Date;
  dueDate: Date;
  currency: string;
  billLabel: string;
  from: string;
  fullname: string;
  billNote: string;
  termsAndConditions: string;
  items: AddBillItemSchemaType[];
  discount?: string | undefined;
  amtDeposited?: string | undefined;
};
