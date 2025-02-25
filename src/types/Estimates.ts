import {EstimateStatusTypes} from '../utils/constants/status';
import {Profile} from './Authentication';
import {Business} from './Business';
import {CustomerData} from './Customers';

type EstimateStatus = 'draft' | 'pending' | 'declined' | 'accepted' | 'expired';

interface EstimateProducts {
  productName: string;
  price: string;
  description: string;
  unit: string;
  quantity: number;
  total: string;
}

interface Estimate {
  products: Array<EstimateProducts>;
  customerData: CustomerData;
  businessData: Business;
  accountData: Profile;
  amountDeposited: string;
  createdAt: string;
  _id: string;
  account: string;
  clientId: string;
  estimateNumber: string;
  estimateSubject: string;
  estimateNote: string | null;
  estimateTerms: string;
  estimateFrom: string;
  estimateDate: string;
  expiryDate: string;
  currency: string;
  subTotal: string;
  discount: string | null;
  taxAmount: string | null;
  tax: string | null;
  grandTotal: string;
  estimateStatus: EstimateStatusTypes;
  useDefaultEstimateNote: boolean;
  useDefaultEstimateTerms: boolean;
  notifyCustomer: boolean;
  __v: number;
  id: string;
}

interface EstimateItems {
  productName: string;
  quantity: string | number;
  price: string;
  description: string;
  unit: string;
}

interface AcceptOrDeclineEstimate {
  estimateId: string;
  customerName: string;
  estimateStatus: string;
}

type CreateEstimate = Pick<
  Estimate,
  | 'products'
  | 'estimateDate'
  | 'expiryDate'
  | 'amountDeposited'
  | 'estimateTerms'
  | 'estimateFrom'
  | 'subTotal'
  | 'discount'
  | 'taxAmount'
  | 'tax'
  | 'grandTotal'
  | 'estimateNote'
  | 'estimateSubject'
  | 'currency'
  | 'useDefaultEstimateNote'
  | 'useDefaultEstimateTerms'
> & {
  estimateTo?: {
    email?: string;
    name?: string;
    phone?: string;
    address?: string | null;
  };
  email?: string;
  name?: string;
  phone?: string;
  address?: string | null;
  estimateStatus?: EstimateStatusTypes;
};

type UpdateEstimate = CreateEstimate & {estimateId: string};

type EstimateMetrics = {
  totalEstimates: number;
  totalEstimatesSent: number;
  totalEstimatesAccepted: number;
  totalEstimatesPending: number;
  totalEstimatesExpired: number;
  totalEstimatesDeclined: number;
  totalEstimatesDrafted: number;
};

export type {
  EstimateStatus,
  EstimateProducts,
  Estimate,
  EstimateItems,
  AcceptOrDeclineEstimate,
  CreateEstimate,
  UpdateEstimate,
  EstimateMetrics,
};
