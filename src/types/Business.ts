export type BusinesSettings = {
  invoiceTermsAndConditions?: string;
  invoiceNotes?: string;
  estimateTermsAndConditions?: string;
  estimateNotes?: string;
  orderTermsAndConditions?: string;
  orderNotes?: string;
  receiptNotes?: string;
};

export type Business = {
  email: string;
  businessName: string;
  address: string;
  phone: string;
  currency: string;
  website?: string;
  accName: string;
  accNumber: string;
  bankName: string;
  logoUrl: string | null;
  numOfInvoices: 0;
  numOfEstimates: 0;
  numOfOrders: 0;
  numOfReceipts: 0;
  isActive: true;
  _id: string;
  account: string;
  createdAt: string;
  __v: number;
  id: string;
} & BusinesSettings;

export type CreateBusiness = Pick<
  Business,
  'businessName' | 'address' | 'phone' | 'website' | 'logoUrl'
>;

export type UpdateBusiness = Pick<
  Business,
  | 'address'
  | 'phone'
  | 'currency'
  | 'website'
  | 'accName'
  | 'accNumber'
  | 'bankName'
> & {businessId: string; logoUrl?: string};
